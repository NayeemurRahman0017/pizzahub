"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import {
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";
import type { Pagination, Transaction } from "@/lib/types";

const label = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ") : "Unknown";

const badge = (status: string) => {
  if (status === "paid" || status === "succeeded") {
    return "bg-green-100 text-green-700";
  }

  if (status === "pending" || status === "open") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-red-100 text-red-700";
};

const formatAmount = (amount: number, currency: string) => {
  const zeroDecimal = ["jpy", "krw", "vnd"].includes(
    (currency ?? "").toLowerCase()
  );

  const value = zeroDecimal ? amount : amount / 100;

  return `${value.toLocaleString(undefined, {
    minimumFractionDigits: zeroDecimal ? 0 : 2,
    maximumFractionDigits: 2,
  })} ${(currency ?? "").toUpperCase()}`.trim();
};

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTransactions = async () => {
      try {
        const data = await api.get<{
          transactions: Transaction[];
          pagination: Pagination;
        }>("/api/admin/transactions", { page, limit: 10 });

        if (cancelled) return;

        setTransactions(data.transactions ?? []);
        setPagination(data.pagination ?? null);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Could not load transactions."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTransactions();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const successful = transactions.filter(
    (t) => t.status === "paid" || t.status === "succeeded"
  ).length;

  const pending = transactions.filter(
    (t) => t.status === "pending" || t.status === "open"
  ).length;

  const failed = transactions.filter(
    (t) =>
      t.status !== "paid" &&
      t.status !== "succeeded" &&
      t.status !== "pending" &&
      t.status !== "open"
  ).length;

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <DashboardShell role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="mt-2 text-gray-500">
            View vendor subscription payment records.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Successful</p>
              <CheckCircle className="text-green-600" size={22} />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {loading ? "—" : successful}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Pending</p>
              <Clock className="text-yellow-600" size={22} />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {loading ? "—" : pending}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Failed</p>
              <XCircle className="text-red-600" size={22} />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {loading ? "—" : failed}
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
              {!loading &&
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {transaction.vendor?.businessName ||
                          transaction.vendor?.name ||
                          "Unknown vendor"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.vendor?.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm capitalize text-gray-700">
                      {transaction.plan}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatAmount(
                        transaction.amount,
                        transaction.currency
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                          transaction.status
                        )}`}
                      >
                        {label(transaction.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.createdAt?.slice(0, 10)}
                    </td>
                  </tr>
                ))}

              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <span className="inline-flex items-center gap-3 text-gray-500">
                      <Loader2
                        size={20}
                        className="animate-spin text-orange-500"
                      />
                      Loading transactions...
                    </span>
                  </td>
                </tr>
              )}

              {!loading && transactions.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No transactions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        <p className="rounded-xl bg-orange-50 p-4 text-sm text-orange-800">
          Payment records are read-only. Admins cannot manually change
          transaction status or payment information.
        </p>
      </div>
    </DashboardShell>
  );
}