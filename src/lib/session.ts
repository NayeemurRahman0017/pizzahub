import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export type Role = "admin" | "vendor" | "customer";

export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireRole(role: Role, from: string) {
  const session = await getServerSession();
  if (!session) redirect(`/sign-in?callbackUrl=${encodeURIComponent(from)}`);
  if (session.user.isBlocked) redirect("/sign-in?blocked=1");
  if (session.user.role !== role) redirect("/dashboard");
  return session;
}