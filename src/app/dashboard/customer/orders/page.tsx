"use client";

import { useEffect, useState } from "react";
import { cancelStoredOrder, loadOrders } from "@/lib/orders-store";

import Image from "next/image";
import Link from "next/link";

import DashboardShell from "@/components/dashboard/dashboard-shell";

type OrderStatus = "Pending" | "Accepted" | "Rejected" | "Cancelled";

type Order = {
  id: number;
  itemName: string;
  image: string;
  vendor: string;
  deliveryDate: string;
  deliveryAddress: string;
  requestDate: string;
  status: OrderStatus;
};

const initialOrders: Order[] = [
  {
    id: 1,
    itemName: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
    vendor: "Pizza Palace",
    deliveryDate: "2026-11-20",
    deliveryAddress: "Dhanmondi, Dhaka",
    requestDate: "2026-11-18",
    status: "Pending",
  },
  {
    id: 2,
    itemName: "Pepperoni Pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
    vendor: "Italian Pizza House",
    deliveryDate: "2026-11-19",
    deliveryAddress: "Uttara, Dhaka",
    requestDate: "2026-11-17",
    status: "Accepted",
  },
  {
    id: 3,
    itemName: "BBQ Chicken Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    vendor: "Food Corner",
    deliveryDate: "2026-11-21",
    deliveryAddress: "Mirpur, Dhaka",
    requestDate: "2026-11-16",
    status: "Rejected",
  },
];

export default function CustomerOrdersPage() {
  // Orders state
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Load orders placed through the order form
  useEffect(() => {
    const t = window.setTimeout(() => {
      setOrders([...(loadOrders() as Order[]), ...initialOrders]);
    }, 0);

    return () => window.clearTimeout(t);
  }, []);

  // Cancel pending order
  const cancelOrder = (id: number) => {
    cancelStoredOrder(id);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === id && o.status === "Pending"
          ? { ...o, status: "Cancelled" }
          : o
      )
    );
  };

  return (
    <DashboardShell role="customer">
      <div className="space-y-6">
        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage your pizza orders.
          </p>
        </div>

        {/* Orders List */}
        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row"
            >
              {/* Pizza Image */}
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl md:w-48">
                <Image
                  src={order.image}
                  alt={order.itemName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>

              {/* Order Information */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {order.itemName}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Vendor: {order.vendor}
                    </p>
                  </div>

                  {/* Order Status */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : order.status === "Cancelled"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <div className="mt-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-semibold">
                      Delivery Date:
                    </span>{" "}
                    {order.deliveryDate}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Request Date:
                    </span>{" "}
                    {order.requestDate}
                  </p>

                  <p className="sm:col-span-2">
                    <span className="font-semibold">
                      Delivery Address:
                    </span>{" "}
                    {order.deliveryAddress}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/customer/orders/${order.id}`}
                    className="rounded-lg bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
                  >
                    View Details
                  </Link>

                  {order.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => cancelOrder(order.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Empty Orders Message */}
          {orders.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              You have no orders yet.
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}