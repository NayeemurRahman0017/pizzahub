"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SimpleBarChart from "@/components/dashboard/simple-bar-chart";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";
import type { CustomerOverview } from "@/lib/types";

const definitions = [
  {
    title: "Total Orders",
    key: "total" as const,
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Pending Orders",
    key: "pending" as const,
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Accepted Orders",
    key: "accepted" as const,
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Rejected Orders",
    key: "rejected" as const,
    icon: XCircle,
    color: "bg-red-100 text-red-600",
  },
];

export default function CustomerDashboardPage() {
  const [data, setData] = useState<CustomerOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<CustomerOverview>("/api/orders/overview");
        if (!cancelled) setData(res);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load overview."
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DashboardShell role="customer">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-orange-600">
            Customer Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Track your pizza orders and manage your account.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        {!data && !error && (
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 size={20} className="animate-spin text-orange-500" />
            <span className="text-sm">Loading your overview...</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {definitions.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                  {data ? data[stat.key] : "—"}
                </h2>
              </div>
            );
          })}
        </div>

        {data && (
          <SimpleBarChart
            title="Orders by Status"
            data={[
              { label: "Pending", value: data.pending },
              { label: "Accepted", value: data.accepted },
              { label: "Rejected", value: data.rejected },
              { label: "Cancelled", value: data.cancelled },
            ]}
          />
        )}

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Order Summary
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Here you can monitor the status of your pizza orders.
          </p>

          <div className="mt-5 rounded-lg bg-orange-50 p-5">
            <p className="text-sm font-medium text-orange-800">
              Ready for your next pizza?
            </p>

            <p className="mt-1 text-sm text-orange-700">
              Explore our menu and discover your favorite pizza.
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}