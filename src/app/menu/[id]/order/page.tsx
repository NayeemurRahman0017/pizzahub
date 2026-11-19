"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import type { MenuItem, Order } from "@/lib/types";

function Notice({ text }: { text: string }) {
  return (
    <main className="min-h-screen bg-orange-50 px-5 py-12">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-700">{text}</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-white"
        >
          Back to Menu
        </Link>
      </div>
    </main>
  );
}

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!params.id) return;
    let cancelled = false;

    if (!/^[a-f\d]{24}$/i.test(params.id)) {
      setMissing(true);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await api.get<{ item: MenuItem }>(
          `/api/menu/${params.id}`
        );
        if (!cancelled) setItem(data.item);
      } catch (err) {
        if (cancelled) return;
        if ((err as { status?: number }).status === 404) {
          setMissing(true);
        } else {
          setLoadError(
            err instanceof Error ? err.message : "Could not load this item."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!item) return;

    const form = new FormData(e.currentTarget);
    const deliveryDate = String(form.get("deliveryDate") ?? "");
    const deliveryAddress = String(form.get("deliveryAddress") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!deliveryDate) return toast.error("Please choose a delivery date.");
    if (deliveryDate < today) {
      return toast.error("Delivery date cannot be in the past.");
    }
    if (deliveryAddress.length < 5) {
      return toast.error("Please enter a valid delivery address.");
    }

    setSubmitting(true);
    try {
      await api.post<{ order: Order }>("/api/orders", {
        itemId: item.id,
        deliveryDate,
        deliveryAddress,
        message,
      });
      toast.success("Your order request was submitted successfully.");
      router.push("/dashboard/customer/orders");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not place the order."
      );
      setSubmitting(false);
    }
  };

  if (isPending || loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-orange-50">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 size={30} className="animate-spin text-primary" />
          <p className="text-sm">Loading...</p>
        </div>
      </main>
    );
  }

  if (loadError) return <Notice text={loadError} />;
  if (missing || !item) {
    return <Notice text="This menu item does not exist or is unavailable." />;
  }

  const role = session?.user.role;
  const userId = session?.user.id;

  if (role === "admin") {
    return <Notice text="Admins cannot place customer orders." />;
  }
  if (role === "vendor" && userId === item.vendorId) {
    return <Notice text="You cannot order your own item." />;
  }

  const box =
    "flex items-start rounded-xl border border-gray-200 px-3 focus-within:border-primary";

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/menu/${item.id}`}
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-primary"
        >
          <ArrowLeft size={18} /> Back to Item
        </Link>

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Place Order
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {item.itemName}
          </h1>
          <p className="mt-2 text-gray-500">
            {item.vendor?.businessName || item.vendor?.name} · ৳{item.price} ·
            Ordering as {session?.user.name}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="deliveryDate"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Delivery Date
              </label>
              <div className={`${box} items-center`}>
                <CalendarDays size={19} className="text-gray-400" />
                <input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  min={today}
                  required
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="deliveryAddress"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Delivery Address
              </label>
              <div className={box}>
                <MapPin size={19} className="mt-3 text-gray-400" />
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  required
                  rows={3}
                  placeholder="Area, house, road and nearby landmark"
                  className="w-full resize-none bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Additional Message / Special Instructions{" "}
                <span className="font-normal text-gray-400">(Optional)</span>
              </label>
              <div className={box}>
                <MessageSquare size={19} className="mt-3 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  maxLength={500}
                  placeholder="Special instructions"
                  className="w-full resize-none bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Order Request"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
