import  DashboardShell  from "@/components/dashboard/dashboard-shell";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

type Transaction = {
  id: number;
  vendor: string;
  email: string;
  plan: string;
  amount: number;
  status: "Successful" | "Pending" | "Failed";
  date: string;
};

const transactions: Transaction[] = [
  {
    id: 1,
    vendor: "Pizza Palace",
    email: "pizza@example.com",
    plan: "Premium",
    amount: 999,
    status: "Successful",
    date: "2026-11-18",
  },
  {
    id: 2,
    vendor: "Italian Pizza House",
    email: "italian@example.com",
    plan: "Premium",
    amount: 999,
    status: "Pending",
    date: "2026-11-17",
  },
  {
    id: 3,
    vendor: "Food Corner",
    email: "food@example.com",
    plan: "Premium",
    amount: 999,
    status: "Failed",
    date: "2026-11-16",
  },
  {
    id: 4,
    vendor: "Green Kitchen",
    email: "green@example.com",
    plan: "Premium",
    amount: 999,
    status: "Successful",
    date: "2026-11-15",
  },
];

export default function AdminTransactionsPage() {
  const successful = transactions.filter(
    (transaction) => transaction.status === "Successful"
  ).length;

  const pending = transactions.filter(
    (transaction) => transaction.status === "Pending"
  ).length;

  const failed = transactions.filter(
    (transaction) => transaction.status === "Failed"
  ).length;

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Transactions
          </h1>
          <p className="mt-2 text-gray-500">
            View vendor subscription payment records.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Successful</p>
              <CheckCircle className="text-green-600" size={22} />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {successful}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Pending</p>
              <Clock className="text-yellow-600" size={22} />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {pending}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Failed</p>
              <XCircle className="text-red-600" size={22} />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {failed}
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 p-5">
            <CreditCard className="text-orange-500" size={22} />
            <h2 className="text-lg font-bold text-gray-900">
              Payment History
            </h2>
          </div>

          <table className="w-full min-w-187.5 text-left">
            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {transaction.vendor}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.email}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.plan}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ৳{transaction.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.status === "Successful"
                          ? "bg-green-100 text-green-700"
                          : transaction.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="rounded-xl bg-orange-50 p-4 text-sm text-orange-800">
          Payment records are read-only. Admins cannot manually change
          transaction status or payment information.
        </p>
      </div>
    </DashboardShell>
  );
}