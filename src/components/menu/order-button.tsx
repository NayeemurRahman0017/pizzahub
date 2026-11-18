"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function OrderButton({ itemId, vendorId, orderable }: { itemId: number; vendorId: string; orderable: boolean }) {
  const { data: session, isPending } = useSession();
  const base = "rounded-xl px-6 py-3 font-bold";

  if (!orderable) return <span className={`${base} bg-gray-200 text-gray-500`}>Unavailable</span>;
  if (isPending) return <span className={`${base} bg-gray-100 text-gray-400`}>Loading...</span>;
  if (!session) return <Link href={`/sign-in?callbackUrl=/menu/${itemId}`} className={`${base} bg-primary text-white hover:bg-red-700`}>Sign in to Order</Link>;
  if (session.user.role === "admin") return <span className={`${base} bg-gray-200 text-gray-500`}>Admins cannot order</span>;
  if (session.user.role === "vendor" && session.user.id === vendorId) return <span className={`${base} bg-gray-200 text-gray-500`}>You cannot order your own item</span>;
  return <Link href={`/menu/${itemId}/order`} className={`${base} bg-primary text-white transition hover:bg-red-700`}>Order Now</Link>;
}