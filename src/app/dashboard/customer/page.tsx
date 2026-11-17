"use client";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "12",
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Pending Orders",
    value: "3",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Accepted Orders",
    value: "7",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Rejected Orders",
    value: "2",
    icon: XCircle,
    color: "bg-red-100 text-red-600",
  },
];

export default function CustomerDashboardPage() {
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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
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
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </div>

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

            <a
              href="/menu"
              className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}