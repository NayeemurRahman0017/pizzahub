"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Plus, Pencil, Trash2 } from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Margherita Classic",
    category: "Classic Pizzas",
    price: 450,
    status: "Approved",
    active: true,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
  },
  {
    id: 2,
    name: "Pepperoni Feast",
    category: "Meat Lovers",
    price: 650,
    status: "Pending",
    active: true,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
  },
  {
    id: 3,
    name: "Veggie Supreme",
    category: "Vegetarian Pizzas",
    price: 520,
    status: "Rejected",
    active: false,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
  },
];

export default function MyMenuItemsPage() {
  const [items, setItems] = useState(initialItems);

  const deleteItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const toggleAvailability = (id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <DashboardShell
      role="vendor"
      userName="Vendor User"
      userEmail="vendor@example.com"
    >
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
                {items.map((item) => (
                  <tr key={item.id} className="text-sm">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={52}
                          height={52}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-gray-800">
                          {item.name}
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
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        disabled={item.status !== "Approved"}
                        className={`rounded-full px-3 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                          item.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          disabled
                          title="Edit will be connected later"
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 opacity-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => deleteItem(item.id)}
                          title="Delete item"
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
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

          {items.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              No menu items found.
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}