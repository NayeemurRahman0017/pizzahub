"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Check, Crown, Sparkles } from "lucide-react";

export default function VendorSubscriptionPage() {
  const [message, setMessage] = useState("");

  return (
    <DashboardShell role="vendor">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-orange-600">
            Vendor Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Subscription Plans
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Choose the right plan for your restaurant.
          </p>
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-center gap-2">
            <Crown className="text-orange-600" size={22} />
            <h2 className="font-bold text-gray-900">Current Plan: Free</h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            You are currently using the Free plan. Upgrade to Premium to
            publish unlimited active menu items.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Free Plan</h2>
              <p className="mt-2 text-sm text-gray-500">
                Get started with the basic vendor features.
              </p>
            </div>

            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500"> / Free</span>
            </div>

            <div className="space-y-4">
              {[
                "Maximum 3 active menu items",
                "Basic vendor dashboard",
                "Customer order management",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="text-green-600" size={18} />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <button
              disabled
              className="mt-8 w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-500"
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="relative rounded-2xl border-2 border-orange-500 bg-white p-6 shadow-sm">
            <div className="absolute -top-3 right-5 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
              RECOMMENDED
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="text-orange-500" size={22} />
              <h2 className="text-xl font-bold text-gray-900">
                Premium Plan
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Grow your restaurant with premium benefits.
            </p>

            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900">
                Premium
              </span>
            </div>

            <div className="space-y-4">
              {[
                "Unlimited active menu items",
                "Premium vendor badge",
                "Featured menu placement",
                "All Free plan features",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="text-green-600" size={18} />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                setMessage(
                  "Stripe Checkout will be connected in the payment integration step."
                )
              }
              className="mt-8 w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Upgrade to Premium
            </button>

            {message && (
              <p className="mt-3 text-center text-sm text-orange-700">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}