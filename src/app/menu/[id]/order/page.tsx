"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { getItem } from "@/lib/menu-data";
import { addOrder, hasActiveDuplicate } from "@/lib/orders-store";

function Notice({ text }: { text: string }) {
  return (
    <main className="min-h-screen bg-orange-50 px-5 py-12">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-gray-700">{text}</p>
        <Link href="/menu" className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-white">Back to Menu</Link>
      </div>
    </main>
  );
}

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const item = getItem(Number(params.id));
  const today = new Date().toISOString().split("T")[0];

  if (isPending) return <div className="grid min-h-[60vh] place-items-center"><span className="h-6 w-6 animate-spin rounded-full border-2 border-orange-200 border-t-primary" /></div>;
  if (!item) return <Notice text="This menu item does not exist." />;
  if (item.status !== "approved") return <Notice text="This item is not available for ordering." />;
  if (session?.user.role === "admin") return <Notice text="Admins cannot place customer orders." />;
  if (session?.user.role === "vendor" && session.user.id === item.vendorId) return <Notice text="You cannot order your own item." />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const deliveryDate = String(form.get("deliveryDate"));
    const deliveryAddress = String(form.get("deliveryAddress")).trim();
    const message = String(form.get("message") ?? "").trim();

    if (deliveryDate < today) return toast.error("Delivery date cannot be in the past.");
    if (deliveryAddress.length < 5) return toast.error("Please enter a valid delivery address.");
    if (hasActiveDuplicate(item.id, deliveryDate)) {
      return toast.error("You already have an active order for this item on that date.");
    }

    setSubmitting(true);
    try {
      addOrder({
        id: Date.now(),
        itemId: item.id,
        itemName: item.name,
        image: item.images[0],
        vendor: item.vendor,
        deliveryDate,
        deliveryAddress,
        message,
        requestDate: today,
        status: "Pending",
      });
      toast.success("Your order request was submitted successfully.");
      router.push("/dashboard/customer/orders");
    } catch {
      setSubmitting(false);
      toast.error("Could not place the order. Please try again.");
    }
  };

  const box = "flex items-start rounded-xl border border-gray-200 px-3 focus-within:border-primary";
  return (
    <main className="min-h-screen bg-orange-50 px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href={`/menu/${item.id}`} className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-primary">
          <ArrowLeft size={18} /> Back to Item
        </Link>
        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Place Order</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{item.name}</h1>
          <p className="mt-2 text-gray-500">{item.vendor} · ৳{item.price} · Ordering as {session?.user.name}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="deliveryDate" className="mb-2 block text-sm font-semibold text-gray-700">Delivery Date</label>
              <div className={`${box} items-center`}>
                <CalendarDays size={19} className="text-gray-400" />
                <input id="deliveryDate" name="deliveryDate" type="date" min={today} required className="w-full bg-transparent px-3 py-3 outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="deliveryAddress" className="mb-2 block text-sm font-semibold text-gray-700">Delivery Address</label>
              <div className={box}>
                <MapPin size={19} className="mt-3 text-gray-400" />
                <textarea id="deliveryAddress" name="deliveryAddress" required rows={3} placeholder="Area, house, road and nearby landmark" className="w-full resize-none bg-transparent px-3 py-3 outline-none" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">Additional Message / Special Instructions <span className="font-normal text-gray-400">(Optional)</span></label>
              <div className={box}>
                <MessageSquare size={19} className="mt-3 text-gray-400" />
                <textarea id="message" name="message" rows={3} placeholder="Special instructions" className="w-full resize-none bg-transparent px-3 py-3 outline-none" />
              </div>
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-red-700 disabled:opacity-60">
              {submitting ? "Submitting..." : "Submit Order Request"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}