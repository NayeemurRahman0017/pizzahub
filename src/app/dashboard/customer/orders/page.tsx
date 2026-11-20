"use client";

import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Order, OrderStatus } from "@/lib/types";

const STATUS_BADGE: Record<OrderStatus, string> = {
pending: "bg-yellow-100 text-yellow-700",
accepted: "bg-green-100 text-green-700",
rejected: "bg-red-100 text-red-700",
cancelled: "bg-gray-100 text-gray-600",
};

const label = (s: OrderStatus) => s.charAt(0).toUpperCase() + s.slice(1);

export default function CustomerOrdersPage() {
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [busyId, setBusyId] = useState<string | null>(null);

const load = useCallback(async () => {
setLoading(true);
setError(null);
try {
const data = await api.get<{ orders: Order[] }>("/api/orders/my");
setOrders(data.orders ?? []);
} catch (err) {
setError(err instanceof Error ? err.message : "Could not load orders.");
} finally {
setLoading(false);
}
}, []);

useEffect(() => {
let cancelled = false;

const fetchOrders = async () => {
  try {
    const data = await api.get<{ orders: Order[] }>("/api/orders/my");
    if (!cancelled) {
      setOrders(data.orders ?? []);
    }
  } catch (err) {
    if (!cancelled) {
      setError(
        err instanceof Error ? err.message : "Could not load orders."
      );
    }
  } finally {
    if (!cancelled) {
      setLoading(false);
    }
  }
};

fetchOrders();

return () => {
  cancelled = true;
};

}, []);

const cancelOrder = async (id: string) => {
if (!window.confirm("Cancel this order?")) return;
setBusyId(id);
try {
await api.patch(`/api/orders/${id}/cancel`);
toast.success("Order cancelled.");
setOrders((prev) =>
prev.map((o) =>
o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o
)
);
} catch (err) {
toast.error(
err instanceof Error ? err.message : "Could not cancel the order."
);
load();
} finally {
setBusyId(null);
}
};

return (
<DashboardShell role="customer">
<div className="space-y-6">
<div>
<h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
<p className="mt-2 text-gray-500">
View and manage your pizza orders.
</p>
</div>

    {error && (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </div>
    )}

    {loading && (
      <div className="flex items-center justify-center gap-3 py-12 text-gray-500">
        <Loader2 size={20} className="animate-spin text-orange-500" />
        <span className="text-sm">Loading your orders...</span>
      </div>
    )}

    <div className="grid gap-5">
      {!loading &&
        orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row"
          >
            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl md:w-48">
              <Image
                src={order.item?.images?.[0] ?? ""}
                alt={order.item?.itemName ?? "Menu item"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {order.item?.itemName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Vendor:{" "}
                    {order.vendor?.businessName || order.vendor?.name}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGE[order.status]}`}
                >
                  {label(order.status)}
                </span>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                <p>
                  <span className="font-semibold">Delivery Date:</span>{" "}
                  {order.deliveryDate?.slice(0, 10)}
                </p>

                <p>
                  <span className="font-semibold">Request Date:</span>{" "}
                  {order.createdAt?.slice(0, 10)}
                </p>

                <p className="sm:col-span-2">
                  <span className="font-semibold">Delivery Address:</span>{" "}
                  {order.deliveryAddress}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/dashboard/customer/orders/${order.id}`}
                  className="rounded-lg bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
                >
                  View Details
                </Link>

                {order.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => cancelOrder(order.id)}
                    disabled={busyId === order.id}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                  >
                    {busyId === order.id ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>

    {!loading && orders.length === 0 && !error && (
      <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
        You have no orders yet.{" "}
        <Link href="/menu" className="font-semibold text-orange-600">
          Browse the menu
        </Link>{" "}
        to place your first order.
      </div>
    )}
  </div>
</DashboardShell>

);
}