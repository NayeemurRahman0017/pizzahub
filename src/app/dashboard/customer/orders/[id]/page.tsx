"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import OrderDetails from "@/components/dashboard/customer/order-details";
import { api } from "@/lib/api";
import type { Order, OrderStatus } from "@/lib/types";

type State =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; order: Order };

const label = (s: OrderStatus) =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as
    | "Pending"
    | "Accepted"
    | "Rejected"
    | "Cancelled";

export default function CustomerOrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const id = params.id;
    if (!id) return;
    let cancelled = false;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      setState({ kind: "error", message: "The requested order could not be found." });
      return;
    }

    (async () => {
      try {
        const data = await api.get<{ order: Order }>(`/api/orders/${id}`);
        if (!cancelled) setState({ kind: "ready", order: data.order });
      } catch (err) {
        if (cancelled) return;
        setState({
          kind: "error",
          message:
            err instanceof Error ? err.message : "The requested order could not be found.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  return (
    <DashboardShell role="customer">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={17} />
            Back to My Orders
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="mt-2 text-gray-500">
            View your order information and current status.
          </p>
        </div>

        {state.kind === "loading" && (
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 size={20} className="animate-spin text-orange-500" />
            <span className="text-sm">Loading order...</span>
          </div>
        )}

        {state.kind === "error" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">Order Not Found</h1>
            <p className="mt-2 text-sm text-gray-500">{state.message}</p>
            <Link
              href="/dashboard/customer/orders"
              className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Back to My Orders
            </Link>
          </div>
        )}

        {state.kind === "ready" && (
          <OrderDetails
            itemName={state.order.item?.itemName ?? "Menu item"}
            image={state.order.item?.images?.[0] ?? ""}
            vendor={
              state.order.vendor?.businessName ||
              state.order.vendor?.name ||
              "Unknown vendor"
            }
            deliveryDate={state.order.deliveryDate?.slice(0, 10) ?? ""}
            deliveryAddress={state.order.deliveryAddress}
            requestDate={state.order.createdAt?.slice(0, 10) ?? ""}
            status={label(state.order.status)}
          />
        )}
      </div>
    </DashboardShell>
  );
}
