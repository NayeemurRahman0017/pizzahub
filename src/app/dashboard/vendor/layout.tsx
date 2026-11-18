import type { ReactNode } from "react";
import RoleGuard from "../../../components/auth/role-guard";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return <RoleGuard role="vendor" path="/dashboard/vendor">{children}</RoleGuard>;
}