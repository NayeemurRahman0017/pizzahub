"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { MenuItem, MenuItemStatus } from "@/lib/types";

const STATUS_LABEL: Record<MenuItemStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  inactive: "Inactive",
};

const STATUS_CLASS: Record<MenuItemStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  inactive: "bg-gray-100 text-gray-600",
};

export default function MyMenuItemsPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<{ items: MenuItem[] }>(
        "/api/vendor/menu-items"
      );
      setItems(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load items.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const deleteItem = async (id: string) => {
    if (!window.confirm("Delete this menu item? This cannot be undone.")) {
      return;
    }
    setBusyId(id);
    try {
      await api.delete(`/api/vendor/menu-items/${id}`);
      toast.success("Menu item deleted.");
      setItems((current) => current.filter((i) => i.id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete item.");
    } finally {
      setBusyId(null);
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    const turningOn = item.status === "inactive";
    setBusyId(item.id);
    try {
      const res = await api.patch<{ status: MenuItemStatus }>(
        `/api/vendor/menu-items/${item.id}/availability`,
        { available: turningOn }
      );
      toast.success(
        turningOn
          ? "Item submitted for approval."
          : "Item is now unavailable."
      );
      setItems((current) =>
        current.map((i) =>
          i.id === item.id ? { ...i, status: res.status } : i
        )
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update availability."
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <DashboardShell role="vendor">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              My Menu Items
            </h2>
            <p className="mt-1 text-gray-500">
              View and manage your menu items.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/menu/add"
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Plus size={20} />
            Add Menu Item
          </Link>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-187.5 text-left">
              <thead className="bg-orange-50 text-sm text-gray-600">
                <tr>
                  <th className="px-5 py-4">Menu Item</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Availability</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-orange-50">
                {!loading &&
                  items.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.images?.[0] ?? ""}
                            alt={item.itemName}
                            width={52}
                            height={52}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <span className="font-semibold text-gray-800">
                            {item.itemName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {item.category}
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-800">
                        ৳{item.price}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[item.status]}`}
                        >
                          {STATUS_LABEL[item.status]}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => toggleAvailability(item)}
                          disabled={
                            busyId === item.id ||
                            (item.status !== "approved" &&
                              item.status !== "inactive")
                          }
                          className={`rounded-full px-3 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                            item.status === "inactive"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.status === "inactive"
                            ? "Inactive"
                            : item.status === "approved"
                              ? "Active"
                              : "Unavailable"}
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/vendor/menu/${item.id}/edit`}
                            title="Edit item"
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Pencil size={17} />
                          </Link>
                          <button
                            onClick={() => deleteItem(item.id)}
                            disabled={busyId === item.id}
                            title="Delete item"
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:opacity-40"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-3 py-12 text-gray-500">
              <Loader2 size={20} className="animate-spin text-orange-500" />
              <span className="text-sm">Loading your menu items...</span>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No menu items yet. Add your first item to get started.
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
