"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

import { signOut, useSession } from "@/lib/auth-client";
import Logo from "@/components/layout/logo";

import {
  LayoutDashboard,
  Pizza,
  PlusCircle,
  ClipboardList,
  CreditCard,
  Users,
  Settings,
  Menu,
  X,
  Receipt,
  UserCircle,
  LogOut,
} from "lucide-react";

type UserRole = "vendor" | "customer" | "admin";

interface DashboardShellProps {
  role: UserRole;
  children: React.ReactNode;
}

const navigation = {
  vendor: [
    {
      label: "Overview",
      href: "/dashboard/vendor",
      icon: LayoutDashboard,
    },
    {
      label: "My Menu Items",
      href: "/dashboard/vendor/menu",
      icon: Pizza,
    },
    {
      label: "Add Menu Item",
      href: "/dashboard/vendor/menu/add",
      icon: PlusCircle,
    },
    {
      label: "Customer Orders",
      href: "/dashboard/vendor/orders",
      icon: ClipboardList,
    },
    {
      label: "Subscription",
      href: "/dashboard/vendor/subscription",
      icon: CreditCard,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/vendor/profile",
      icon: Settings,
    },
  ],

  customer: [
    {
      label: "Overview",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      label: "My Orders",
      href: "/dashboard/customer/orders",
      icon: ClipboardList,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/customer/profile",
      icon: Settings,
    },
  ],

  admin: [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      label: "Manage Menu Items",
      href: "/dashboard/admin/menu-items",
      icon: Pizza,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: Receipt,
    },
  ],
};

export default function DashboardShell({
  role,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session } = useSession();

  const userName = session?.user.name ?? "";
  const userEmail = session?.user.email ?? "";

  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      return toast.error(error.message ?? "Logout failed.");
    }

    toast.success("Logged out successfully.");

    router.push("/");
    router.refresh();
  };

  const links = navigation[role];

  return (
    <div className="min-h-screen bg-[#fffaf5] md:flex">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-orange-100 bg-white transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-orange-100 px-6 py-5">
          <Logo />

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-600 hover:bg-orange-50 md:hidden"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {role} Dashboard
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4">
          {links.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== `/dashboard/${role}` &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md shadow-orange-100"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-orange-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-orange-700">
              <UserCircle size={25} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {userName}
              </p>

              <p className="truncate text-xs text-gray-500">
                {userEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-orange-100 bg-white/95 px-4 backdrop-blur md:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-700 hover:bg-orange-50 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={23} />
          </button>

          <h1 className="text-lg font-bold capitalize text-gray-800">
            {role} Dashboard
          </h1>
        </header>

        <main className="container mx-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}