"use client";

import Link from "next/link";
import { Pizza, MapPin, Phone, User } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-2xl font-bold text-orange-600"
        >
          <Pizza size={30} />
          PizzaHub
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mb-8 text-gray-500">
            Enter your delivery information.
          </p>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Full Name
              </label>

              <div className="flex items-center rounded-lg border px-3">
                <User size={19} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  className="w-full px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Phone Number
              </label>

              <div className="flex items-center rounded-lg border px-3">
                <Phone size={19} className="text-gray-400" />
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Delivery Address
              </label>

              <div className="flex items-start rounded-lg border px-3">
                <MapPin size={19} className="mt-3 text-gray-400" />
                <textarea
                  placeholder="Enter your full delivery address"
                  required
                  rows={3}
                  className="w-full resize-none px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Payment Method
              </label>

              <select
                required
                className="w-full rounded-lg border bg-white px-3 py-3 outline-none"
                defaultValue="cash"
              >
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Place Order
            </button>
          </form>

          <Link
            href="/cart"
            className="mt-6 block text-center text-orange-600 hover:underline"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}