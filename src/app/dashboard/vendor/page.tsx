import DashboardShell from "@/components/dashboard/dashboard-shell";
import {
  Pizza,
  CheckCircle,
  Clock,
  ShoppingBag,
  Crown,
} from "lucide-react";

const stats = [
  {
    title: "Total Menu Items",
    value: "12",
    icon: Pizza,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Active Menu Items",
    value: "8",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Orders",
    value: "5",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Accepted Orders",
    value: "18",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
];

const weeklyOrders = [
  { day: "Sat", height: "40%" },
  { day: "Sun", height: "65%" },
  { day: "Mon", height: "50%" },
  { day: "Tue", height: "80%" },
  { day: "Wed", height: "60%" },
  { day: "Thu", height: "90%" },
  { day: "Fri", height: "70%" },
];

export default function VendorDashboard() {
  return (
    <DashboardShell
      role="vendor"
      userName="Vendor User"
      userEmail="vendor@example.com"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="mt-1 text-gray-500">
            Welcome back! Here is your restaurant summary.
          </p>
        </div>

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
                      {item.value}
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
              You are currently using the Free Plan.
            </p>
          </div>

          <span className="w-fit rounded-full bg-white px-5 py-2 font-semibold text-orange-600">
            Free Plan
          </span>
        </div>

        {/* Weekly Orders Chart */}
        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Weekly Orders
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Order activity during the week
          </p>

          <div className="mt-8 flex h-56 items-end justify-around gap-3 border-b border-gray-200">
            {weeklyOrders.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div
                  className="w-full max-w-12 rounded-t-lg bg-orange-400"
                  style={{ height: item.height }}
                />

                <span className="text-xs text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}