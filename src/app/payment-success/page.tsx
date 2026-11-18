import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-[70vh] bg-orange-50 px-5 py-16">
      <div className="mx-auto max-w-lg rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-green-600" size={64} />
        <h1 className="mt-5 text-3xl font-bold text-gray-900">Payment Confirmed</h1>
        <p className="mt-3 leading-7 text-gray-500">
          Your checkout was successful. Premium status will be activated only after server payment verification.
        </p>
        <Link href="/dashboard/vendor" className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
