"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import SimpleBarChart from "@/components/dashboard/simple-bar-chart";
import { Loader2 } from "lucide-react";

import {
  Users,
  Store,
  UserRound,
  Pizza,
  Clock,
  CreditCard,
} from "lucide-react";
import { api } from "@/lib/api";
import type { AdminOverview } from "@/lib/types";

const definitions = [
  { title: "Total Users", key: "totalUsers" as const, icon: Users },
  { title: "Total Vendors", key: "totalVendors" as const, icon: Store },
  { title: "Total Customers", key: "totalCustomers" as const, icon: UserRound },
  { title: "Total Menu Items", key: "totalMenuItems" as const, icon: Pizza },
  { title: "Pending Menu Items", key: "pendingMenuItems" as const, icon: Clock },
  {
    title: "Total Transactions",
    key: "totalTransactions" as const,
    icon: CreditCard,
  },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<AdminOverview>("/api/admin/overview");
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
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor and manage the PizzaHub platform.
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
            <span className="text-sm">Loading platform statistics...</span>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {definitions.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900">
                      {data ? data[stat.key] : "—"}
                    </h2>
                  </div>

                  <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                    <Icon size={25} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {data && (
          <SimpleBarChart
            title="Platform Overview"
            data={[
              { label: "Vendors", value: data.totalVendors },
              { label: "Customers", value: data.totalCustomers },
              { label: "Menu Items", value: data.totalMenuItems },
              { label: "Pending", value: data.pendingMenuItems },
              { label: "Transactions", value: data.totalTransactions },
            ]}
          />
        )}

        <p className="text-sm text-gray-500">
          Manage registered users, review menu items, and monitor platform
          transactions from the admin dashboard.
        </p>
      </div>
    </DashboardShell>
  );
}
