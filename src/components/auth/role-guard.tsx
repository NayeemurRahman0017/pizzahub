import { Suspense, type ReactNode } from "react";
import { requireRole, type Role } from "@/lib/session";

async function Guard({ role, path, children }: { role: Role; path: string; children: ReactNode }) {
  await requireRole(role, path);
  return <>{children}</>;
}

export default function RoleGuard(props: { role: Role; path: string; children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-orange-200 border-t-primary" />
        </div>
      }
    >
      <Guard {...props} />
    </Suspense>
  );
}