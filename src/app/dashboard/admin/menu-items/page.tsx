"use client";

import { useState } from "react";
import  DashboardShell  from "@/components/dashboard/dashboard-shell";
import { Search, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

type MenuItem = {
  id: number;
  name: string;
  vendor: string;
  price: number;
  status: "Pending" | "Approved" | "Rejected" | "Inactive";
};

const initialItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    vendor: "Pizza Palace",
    price: 450,
    status: "Pending",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    vendor: "Italian Pizza House",
    price: 550,
    status: "Approved",
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    vendor: "Food Corner",
    price: 650,
    status: "Rejected",
  },
  {
    id: 4,
    name: "Vegetable Pizza",
    vendor: "Green Kitchen",
    price: 400,
    status: "Inactive",
  },
];

export default function ManageMenuItemsPage() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const updateStatus = (
    id: number,
    status: MenuItem["status"]
  ) => {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    toast.success(`Menu item ${status.toLowerCase()} successfully!`);
  };

  const deleteItem = (id: number) => {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );

    toast.success("Menu item deleted successfully!");
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search item or vendor..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.vendor}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    ৳{item.price}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : item.status === "Inactive"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {item.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(item.id, "Approved")}
                            title="Approve"
                            className="rounded-lg bg-green-50 p-2 text-green-700 hover:bg-green-100"
                          >
                            <Check size={17} />
                          </button>

                          <button
                            onClick={() => updateStatus(item.id, "Rejected")}
                            title="Reject"
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          >
                            <X size={17} />
                          </button>
                        </>
                      )}

                      {item.status === "Approved" && (
                        <button
                          onClick={() => updateStatus(item.id, "Inactive")}
                          className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                        >
                          Deactivate
                        </button>
                      )}

                      {item.status === "Inactive" && (
                        <button
                          onClick={() => updateStatus(item.id, "Approved")}
                          className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                        >
                          Activate
                        </button>
                      )}

                      <button
                        onClick={() => deleteItem(item.id)}
                        title="Delete"
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
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
      </div>
    </DashboardShell>
  );
}