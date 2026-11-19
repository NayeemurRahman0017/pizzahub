"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import {
  Pizza,
  CheckCircle,
  Clock,
  ShoppingBag,
  Crown,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";
import type { VendorOverview } from "@/lib/types";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function VendorDashboard() {
  const [data, setData] = useState<VendorOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<VendorOverview>("/api/vendor/overview");
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

  const isPremium = data?.subscriptionPlan === "premium";

  const stats = [
    {
      title: "Total Menu Items",
      value: data?.totalMenuItems ?? 0,
      icon: Pizza,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Active Menu Items",
      value: data?.activeMenuItems ?? 0,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Orders",
      value: data?.pendingOrders ?? 0,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Accepted Orders",
      value: data?.acceptedOrders ?? 0,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const weekly = (data?.weeklyOrders ?? []).map((d) => {
    const date = new Date(`${d.date}T00:00:00`);
    return {
      day: Number.isNaN(date.getTime())
        ? d.date
        : DAY_LABELS[date.getUTCDay()],
      count: d.count,
    };
  });
  const maxCount = Math.max(1, ...weekly.map((w) => w.count));

  return (
    <DashboardShell role="vendor">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="mt-1 text-gray-500">
            Welcome back! Here is your restaurant summary.
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

        {/* Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                      {data ? item.value : "—"}
                    </h3>
                  </div>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={25} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Card */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 p-6 text-white sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Crown size={22} />
              <h3 className="text-xl font-bold">Current Subscription</h3>
            </div>

            <p className="mt-2 text-orange-50">
              {isPremium
                ? "You are enjoying all Premium benefits."
                : "You are currently using the Free Plan."}
              {data?.subscriptionExpiresAt && (
                <> Renews on {new Date(data.subscriptionExpiresAt).toLocaleDateString()}.</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-fit rounded-full bg-white px-5 py-2 font-semibold text-orange-600">
              {isPremium ? "Premium Plan" : "Free Plan"}
            </span>
            {!isPremium && (
              <Link
                href="/dashboard/vendor/subscription"
                className="rounded-full border border-white/70 px-5 py-2 font-semibold text-white transition hover:bg-white hover:text-orange-600"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* Weekly Orders Chart */}
        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">Weekly Orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            Order activity during the last 7 days
          </p>

          {weekly.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-500">
              No order activity in the last week.
            </p>
          ) : (
            <div className="mt-8 flex h-56 items-end justify-around gap-3 border-b border-gray-200">
              {weekly.map((item) => (
                <div
                  key={item.day + item.count}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold text-gray-600">
                    {item.count}
                  </span>
                  <div
                    className="w-full max-w-12 rounded-t-lg bg-orange-400"
                    style={{
                      height: `${Math.max(
                        4,
                        Math.round((item.count / maxCount) * 100)
                      )}%`,
                    }}
                  />
                  <span className="text-xs text-gray-500">{item.day}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
