"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    window.setTimeout(() => {
      toast.success("Your order request was submitted successfully.");
      router.push("/dashboard/customer/orders");
    }, 700);
  };

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/menu/${params.id}`}
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Item
        </Link>

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Place Order
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Delivery Details
          </h1>
          <p className="mt-2 text-gray-500">
            Confirm when and where you want this pizza delivered.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="deliveryDate" className="mb-2 block text-sm font-semibold text-gray-700">
                Delivery Date
              </label>
              <div className="flex items-center rounded-xl border border-gray-200 px-3 focus-within:border-primary">
                <CalendarDays size={19} className="text-gray-400" />
                <input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  required
                  className="w-full px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deliveryAddress" className="mb-2 block text-sm font-semibold text-gray-700">
                Delivery Address
              </label>
              <div className="flex items-start rounded-xl border border-gray-200 px-3 focus-within:border-primary">
                <MapPin size={19} className="mt-3 text-gray-400" />
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  required
                  rows={3}
                  placeholder="Area, house, road and nearby landmark"
                  className="w-full resize-none px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                Additional Message <span className="font-normal text-gray-400">(Optional)</span>
              </label>
              <div className="flex items-start rounded-xl border border-gray-200 px-3 focus-within:border-primary">
                <MessageSquare size={19} className="mt-3 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Special instructions"
                  className="w-full resize-none px-3 py-3 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Order Request"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
