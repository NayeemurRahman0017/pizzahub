"use client";

import { useState } from "react";
import  DashboardShell  from "@/components/dashboard/dashboard-shell";
import { Search, ShieldCheck, ShieldBan } from "lucide-react";
import { toast } from "sonner";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Customer" | "Vendor";
  isBlocked: boolean;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Customer",
    email: "john@example.com",
    role: "Customer",
    isBlocked: false,
  },
  {
    id: 2,
    name: "Pizza Palace",
    email: "pizza@example.com",
    role: "Vendor",
    isBlocked: false,
  },
  {
    id: 3,
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    role: "Customer",
    isBlocked: true,
  },
  {
    id: 4,
    name: "Italian Pizza House",
    email: "italian@example.com",
    role: "Vendor",
    isBlocked: false,
  },
];

export default function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const toggleBlock = (id: number) => {
    const selectedUser = users.find((user) => user.id === id);

    if (!selectedUser) return;

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === id
          ? { ...user, isBlocked: !user.isBlocked }
          : user
      )
    );

    toast.success(
      selectedUser.isBlocked
        ? "User unblocked successfully!"
        : "User blocked successfully!"
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Users
          </h1>
          <p className="mt-2 text-gray-500">
            View, search, and manage platform users.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="All">All Roles</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
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
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.role}
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
                      onClick={() => toggleBlock(user.id)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
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

              {filteredUsers.length === 0 && (
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
      </div>
    </DashboardShell>
  );
}