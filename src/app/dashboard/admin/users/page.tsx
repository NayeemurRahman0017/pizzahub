"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Search, ShieldCheck, ShieldBan, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { AdminUser, Pagination } from "@/lib/types";

const ROLE_LABEL: Record<string, string> = {
  admin: "Admin",
  vendor: "Vendor",
  customer: "Customer",
};

export default function ManageUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    setLoading(true);
    setError(null);
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    setPage(1);
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        const data = await api.get<{
          users: AdminUser[];
          pagination: Pagination;
        }>("/api/admin/users", {
          search: debouncedSearch || undefined,
          role: roleFilter === "All" ? undefined : roleFilter.toLowerCase(),
          page,
          limit: 10,
        });

        if (cancelled) return;

        setUsers(data.users ?? []);
        setPagination(data.pagination ?? null);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Could not load users."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, roleFilter, page, refreshKey]);

  const toggleBlock = async (user: AdminUser) => {
    setBusyId(user.id);

    try {
      await api.patch(`/api/admin/users/${user.id}/block`, {
        isBlocked: !user.isBlocked,
      });

      toast.success(
        user.isBlocked
          ? "User unblocked successfully!"
          : "User blocked successfully!"
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isBlocked: !user.isBlocked } : u
        )
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update this user."
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="mt-2 text-gray-500">
            View, search, and manage platform users.
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => handleRoleChange(e.target.value)}
            aria-label="Filter by role"
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="All">All Roles</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full min-w-175 text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {!loading &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {ROLE_LABEL[user.role] ?? user.role}
                      {user.businessName && (
                        <span className="block text-xs text-gray-400">
                          {user.businessName}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleBlock(user)}
                        disabled={busyId === user.id || user.role === "admin"}
                        title={
                          user.role === "admin"
                            ? "Admin accounts cannot be blocked"
                            : undefined
                        }
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                          user.isBlocked
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {user.isBlocked ? (
                          <ShieldCheck size={16} />
                        ) : (
                          <ShieldBan size={16} />
                        )}

                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}

              {loading && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center">
                    <span className="inline-flex items-center gap-3 text-gray-500">
                      <Loader2
                        size={20}
                        className="animate-spin text-orange-500"
                      />
                      Loading users...
                    </span>
                  </td>
                </tr>
              )}

              {!loading && users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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