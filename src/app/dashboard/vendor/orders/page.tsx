"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Check, X, Clock, MapPin, CalendarDays } from "lucide-react";

type OrderStatus = "Pending" | "Accepted" | "Rejected";

type Order = {
  id: number;
  customer: string;
  email: string;
  item: string;
  quantity: number;
  date: string;
  address: string;
  message: string;
  status: OrderStatus;
};

const initialOrders: Order[] = [
  {
    id: 1001,
    customer: "Rahim Ahmed",
    email: "rahim@example.com",
    item: "Margherita Pizza",
    quantity: 2,
    date: "2026-11-20",
    address: "Dhanmondi, Dhaka",
    message: "Please deliver before 8 PM.",
    status: "Pending",
  },
  {
    id: 1002,
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    item: "Chicken BBQ Pizza",
    quantity: 1,
    date: "2026-11-21",
    address: "Mirpur, Dhaka",
    message: "Please call before delivery.",
    status: "Pending",
  },
  {
    id: 1003,
    customer: "Tanvir Hasan",
    email: "tanvir@example.com",
    item: "Pepperoni Pizza",
    quantity: 3,
    date: "2026-11-19",
    address: "Uttara, Dhaka",
    message: "No extra spicy sauce.",
    status: "Accepted",
  },
];

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateStatus = (id: number, status: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id && order.status === "Pending"
          ? { ...order, status }
          : order
      )
    );
  };

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <DashboardShell role="vendor">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-orange-600">
            Vendor Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Customer Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            View customer orders and manage their status.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Accepted Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {orders.filter((order) => order.status === "Accepted").length}
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order #{order.id}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-gray-900">
                    {order.item}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === "Pending"
                      ? "bg-orange-100 text-orange-700"
                      : order.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-gray-800">
                    Customer Information
                  </p>
                  <p className="mt-2 text-gray-600">{order.customer}</p>
                  <p className="text-gray-500">{order.email}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Order Information
                  </p>
                  <p className="mt-2 text-gray-600">
                    Quantity: {order.quantity}
                  </p>
                  <p className="text-gray-600">
                    <CalendarDays className="mr-1 inline h-4 w-4" />
                    {order.date}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Delivery Address
                  </p>
                  <p className="mt-2 text-gray-600">
                    <MapPin className="mr-1 inline h-4 w-4" />
                    {order.address}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Customer Message
                  </p>
                  <p className="mt-2 text-gray-600">{order.message}</p>
                </div>
              </div>

              {order.status === "Pending" && (
                <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                  <button
                    onClick={() => updateStatus(order.id, "Accepted")}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <Check size={16} />
                    Accept Order
                  </button>

                  <button
                    onClick={() => updateStatus(order.id, "Rejected")}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <X size={16} />
                    Reject Order
                  </button>
                </div>
              )}

              {order.status !== "Pending" && (
                <div className="mt-5 flex items-center gap-2 border-t pt-4 text-sm text-gray-500">
                  <Clock size={16} />
                  This order has already been processed.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}