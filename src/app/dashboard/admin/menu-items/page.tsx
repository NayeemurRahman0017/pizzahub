"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Search, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { MenuItem, MenuItemStatus, Pagination } from "@/lib/types";

const STATUS_LABEL: Record<MenuItemStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  inactive: "Inactive",
};

const STATUS_BADGE: Record<MenuItemStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  inactive: "bg-gray-100 text-gray-600",
};

const ACTIONS: Record<
  MenuItemStatus,
  {
    status: Exclude<MenuItemStatus, "pending">;
    label: string;
    kind: "ok" | "no" | "off";
  }[]
> = {
  pending: [
    { status: "approved", label: "Approve", kind: "ok" },
    { status: "rejected", label: "Reject", kind: "no" },
  ],
  approved: [
    { status: "inactive", label: "Deactivate", kind: "off" },
    { status: "rejected", label: "Reject", kind: "no" },
  ],
  inactive: [
    { status: "approved", label: "Activate", kind: "ok" },
  ],
  rejected: [
    { status: "approved", label: "Approve", kind: "ok" },
  ],
};

const KIND_CLASS = {
  ok: "bg-green-50 text-green-700 hover:bg-green-100",
  no: "bg-red-50 text-red-600 hover:bg-red-100",
  off: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

export default function ManageMenuItemsPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [search]);

  
  useEffect(() => {
    let cancelled = false;

    const fetchItems = async () => {
      try {
        const data = await api.get<{
          items: MenuItem[];
          pagination: Pagination;
        }>("/api/admin/menu-items", {
          search: debouncedSearch || undefined,
          status:
            statusFilter === "All"
              ? undefined
              : statusFilter.toLowerCase(),
          page,
          limit: 10,
        });

        if (!cancelled) {
          setItems(data.items ?? []);
          setPagination(data.pagination ?? null);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load menu items."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchItems();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, statusFilter, page, refreshKey]);

  
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    setLoading(true);
    setError(null);
  };

  
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setPage(1);
    setLoading(true);
    setError(null);
  };

  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLoading(true);
    setError(null);
  };

  
  const updateStatus = async (
    id: string,
    status: Exclude<MenuItemStatus, "pending">
  ) => {
    setBusyId(id);

    try {
      await api.patch(`/api/admin/menu-items/${id}/status`, {
        status,
      });

      toast.success(
        `Menu item ${STATUS_LABEL[status].toLowerCase()} successfully!`
      );

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status }
            : item
        )
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not update the item."
      );

      setLoading(true);
      setRefreshKey((prev) => prev + 1);
    } finally {
      setBusyId(null);
    }
  };

  
  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this menu item permanently?")) {
      return;
    }

    setBusyId(id);

    try {
      await api.delete(`/api/admin/menu-items/${id}`);

      toast.success("Menu item deleted successfully!");

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not delete the item."
      );
    } finally {
      setBusyId(null);
    }
  };

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">

       
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Menu Items
          </h1>

          <p className="mt-2 text-gray-500">
            Review and manage submitted menu items.
          </p>
        </div>

        
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

       
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row">

          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search item or vendor..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full min-w-187.5 text-left">

            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-6 py-4">Menu Item</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {!loading &&
                items.map((item) => (
                  <tr key={item.id}>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.itemName}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.vendor?.businessName || item.vendor?.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      ৳{item.price}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGE[item.status]}`}
                      >
                        {STATUS_LABEL[item.status]}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">

                        {ACTIONS[item.status].map((action) => (
                          <button
                            key={action.status}
                            onClick={() =>
                              updateStatus(item.id, action.status)
                            }
                            disabled={busyId === item.id}
                            title={action.label}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold disabled:opacity-40 ${KIND_CLASS[action.kind]}`}
                          >
                            {action.label}
                          </button>
                        ))}

                        <button
                          onClick={() => deleteItem(item.id)}
                          disabled={busyId === item.id}
                          title="Delete"
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:opacity-40"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

              
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <span className="inline-flex items-center gap-3 text-gray-500">
                      <Loader2
                        size={20}
                        className="animate-spin text-orange-500"
                      />
                      Loading menu items...
                    </span>
                  </td>
                </tr>
              )}

              
              {!loading && items.length === 0 && !error && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No menu items found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">

            <button
              onClick={() =>
                handlePageChange(Math.max(1, page - 1))
              }
              disabled={page <= 1}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, page + 1))
              }
              disabled={page >= totalPages}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </DashboardShell>
  );
}