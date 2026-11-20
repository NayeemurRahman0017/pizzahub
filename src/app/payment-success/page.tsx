"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { api } from "@/lib/api";
import type { SubscriptionInfo } from "@/lib/types";

type State = "checking" | "premium" | "not-yet" | "error";

function PaymentSuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        const data = await api.get<SubscriptionInfo>("/api/subscriptions/me");
        if (!cancelled) setState(data.plan === "premium" ? "premium" : "not-yet");
      } catch {
        if (!cancelled) setState("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "checking") {
    return (
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <Loader2 size={48} className="animate-spin text-orange-500" />
        <p className="text-sm">Verifying your payment...</p>
      </div>
    );
  }

  if (state === "premium") {
    return (
      <>
        <CheckCircle2 className="mx-auto text-green-600" size={64} />
        <h1 className="mt-5 text-3xl font-bold text-gray-900">
          Payment Confirmed
        </h1>
        <p className="mt-3 leading-7 text-gray-500">
          Thanks for upgrading! Your Premium subscription is now active and
          you can publish unlimited active menu items.
        </p>
        <Link
          href="/dashboard/vendor/subscription"
          className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white"
        >
          View My Subscription
        </Link>
      </>
    );
  }

  if (state === "error") {
    return (
      <>
        <XCircle className="mx-auto text-red-500" size={64} />
        <h1 className="mt-5 text-3xl font-bold text-gray-900">
          Could Not Verify Payment
        </h1>
        <p className="mt-3 leading-7 text-gray-500">
          We could not confirm your subscription yet. Refresh this page in a
          moment, or contact support if you were charged.
        </p>
        <Link
          href="/dashboard/vendor/subscription"
          className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white"
        >
          Back to Plans
        </Link>
      </>
    );
  }

  return (
    <>
      <CheckCircle2 className="mx-auto text-green-600" size={64} />
      <h1 className="mt-5 text-3xl font-bold text-gray-900">
        Payment Processing
      </h1>
      <p className="mt-3 leading-7 text-gray-500">
        {sessionId
          ? "Your payment is being confirmed with Stripe. Premium activates automatically once the webhook is verified."
          : "Your payment is being confirmed. Premium activates automatically once Stripe verification completes."}
      </p>
      <Link
        href="/dashboard/vendor/subscription"
        className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white"
      >
        View My Subscription
      </Link>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-[70vh] bg-orange-50 px-5 py-16">
      <div className="mx-auto max-w-lg rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Loader2 size={48} className="animate-spin text-orange-500" />
              <p className="text-sm">Verifying your payment...</p>
            </div>
          }
        >
          <PaymentSuccessContent />
        </Suspense>
      </div>
    </main>
  );
}