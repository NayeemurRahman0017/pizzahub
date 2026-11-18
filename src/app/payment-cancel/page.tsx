import Link from "next/link";
import { CircleX } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-[70vh] bg-orange-50 px-5 py-16">
      <div className="mx-auto max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <CircleX className="mx-auto text-red-500" size={64} />
        <h1 className="mt-5 text-3xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="mt-3 leading-7 text-gray-500">
          No payment was completed. You can return to subscription settings and try again.
        </p>
        <Link href="/dashboard/vendor/subscription" className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">
          View Plans
        </Link>
      </div>
    </main>
  );
}
