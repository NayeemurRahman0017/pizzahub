import DashboardShell from "@/components/dashboard/dashboard-shell";
import SimpleBarChart from "@/components/dashboard/simple-bar-chart";

import {
  Users,
  Store,
  UserRound,
  Pizza,
  Clock,
  CreditCard,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    icon: Users,
  },
  {
    title: "Total Vendors",
    value: "85",
    icon: Store,
  },
  {
    title: "Total Customers",
    value: "1,165",
    icon: UserRound,
  },
  {
    title: "Total Menu Items",
    value: "320",
    icon: Pizza,
  },
  {
    title: "Pending Menu Items",
    value: "24",
    icon: Clock,
  },
  {
    title: "Total Transactions",
    value: "156",
    icon: CreditCard,
  },
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        {/* Dashboard Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor and manage the PizzaHub platform.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
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
                      {stat.value}
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

        {/* Platform Overview Chart */}
        <SimpleBarChart
          title="Platform Overview"
          data={[
            { label: "Vendors", value: 85 },
            { label: "Customers", value: 1165 },
            { label: "Menu Items", value: 320 },
            { label: "Pending", value: 24 },
            { label: "Transactions", value: 156 },
          ]}
        />

        <p className="text-sm text-gray-500">
          Manage registered users, review menu items, and monitor platform
          transactions from the admin dashboard.
        </p>
      </div>
    </DashboardShell>
  );
}