"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Check, Crown, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { SubscriptionInfo } from "@/lib/types";

export default function VendorSubscriptionPage() {
  const [loading, setLoading] = useState(false);
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.get<SubscriptionInfo>("/api/subscriptions/me");
        if (!cancelled) setSub(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load your plan."
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isPremium = sub?.plan === "premium";

  const handleUpgrade = async () => {
    setLoading(true);

    try {
      const data = await api.post<{ url: string }>(
        "/api/subscriptions/checkout"
      );

      if (!data.url) throw new Error("Could not start checkout.");

      window.location.href = data.url;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not start checkout."
      );
      setLoading(false);
    }
  };

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

            <h2 className="font-bold text-gray-900">
              Current Plan:{" "}
              {!sub && !error
                ? "Loading..."
                : isPremium
                  ? "Premium"
                  : "Free"}
            </h2>
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <p className="mt-2 text-sm text-gray-600">
            {isPremium
              ? "You are currently using the Premium plan. Enjoy your premium benefits."
              : "You are currently using the Free plan. Upgrade to Premium to publish unlimited active menu items."}
          </p>

          {sub && !isPremium && (
            <p className="mt-1 text-sm text-gray-500">
              Active items: {sub.activeItems} / {sub.activeItemLimit ?? 3}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Free Plan
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Get started with the basic vendor features.
              </p>
            </div>

            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900">
                ৳0
              </span>

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

                  <span className="text-sm text-gray-600">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {!isPremium && (
              <button
                disabled
                className="mt-8 w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-500"
              >
                Current Plan
              </button>
            )}
          </div>

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

                  <span className="text-sm text-gray-600">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpgrade}
              disabled={loading || isPremium || !sub}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {!sub ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Loading...
                </>
              ) : isPremium ? (
                "Current Plan"
              ) : loading ? (
                "Redirecting to Stripe..."
              ) : (
                <>
                  <Sparkles size={16} /> Upgrade to Premium
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}