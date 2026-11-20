"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Check, X, Clock, MapPin, CalendarDays, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Order, OrderStatus } from "@/lib/types";

const STATUS_BADGE: Record<OrderStatus, string> = {
  pending: "bg-orange-100 text-orange-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const label = (s: OrderStatus) => s.charAt(0).toUpperCase() + s.slice(1);

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<{ orders: Order[] }>("/api/vendor/orders");
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
        const data = await api.get<{ orders: Order[] }>("/api/vendor/orders");
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

  const updateStatus = async (id: string, status: "accepted" | "rejected") => {
    setBusyId(id);
    try {
      await api.patch(`/api/vendor/orders/${id}/status`, { status });
      toast.success(`Order ${status}.`);
      setOrders((current) =>
        current.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update the order."
      );
      load();
    } finally {
      setBusyId(null);
    }
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const acceptedCount = orders.filter((o) => o.status === "accepted").length;
  const rejectedCount = orders.filter((o) => o.status === "rejected").length;

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

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {loading ? "—" : orders.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {loading ? "—" : pendingCount}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Accepted Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {loading ? "—" : acceptedCount}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Rejected Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {loading ? "—" : rejectedCount}
            </h2>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-12 text-gray-500">
            <Loader2 size={20} className="animate-spin text-orange-500" />
            <span className="text-sm">Loading orders...</span>
          </div>
        )}

        {!loading && orders.length === 0 && !error && (
          <div className="rounded-xl border bg-white py-12 text-center text-gray-500">
            No customer orders yet.
          </div>
        )}

        <div className="space-y-4">
          {!loading &&
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-gray-900">
                      {order.item?.itemName}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_BADGE[order.status]}`}
                  >
                    {label(order.status)}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Customer Information
                    </p>
                    <p className="mt-2 text-gray-600">
                      {order.customer?.name}
                    </p>
                    <p className="text-gray-500">{order.customer?.email}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Order Information
                    </p>
                    <p className="mt-2 text-gray-600">
                      Price: ৳{order.item?.price}
                    </p>
                    <p className="text-gray-600">
                      <CalendarDays className="mr-1 inline h-4 w-4" />
                      {order.deliveryDate?.slice(0, 10)}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Delivery Address
                    </p>
                    <p className="mt-2 text-gray-600">
                      <MapPin className="mr-1 inline h-4 w-4" />
                      {order.deliveryAddress}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Customer Message
                    </p>
                    <p className="mt-2 text-gray-600">
                      {order.message || "No special instructions."}
                    </p>
                  </div>
                </div>

                {order.status === "pending" && (
                  <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                    <button
                      onClick={() => updateStatus(order.id, "accepted")}
                      disabled={busyId === order.id}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                    >
                      <Check size={16} />
                      Accept Order
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "rejected")}
                      disabled={busyId === order.id}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                    >
                      <X size={16} />
                      Reject Order
                    </button>
                  </div>
                )}

                {order.status !== "pending" && (
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