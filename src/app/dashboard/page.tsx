import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";

async function Redirector(): Promise<ReactNode> {
  const session = await getServerSession();
  if (!session) redirect("/sign-in?callbackUrl=/dashboard");
  if (session.user.isBlocked) redirect("/sign-in?blocked=1");
  const role = session.user.role;
  redirect(role === "admin" || role === "vendor" ? `/dashboard/${role}` : "/dashboard/customer");
  return null;
}

export default function DashboardIndex() {
  return <Suspense fallback={null}><Redirector /></Suspense>;
}