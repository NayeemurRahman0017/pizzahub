
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Moon,
  Pizza,
  Sun,
  X,
  LayoutDashboard,
  Settings,
  LogOut,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

const DASHBOARD_PATH: Record<string, string> = {
  admin: "/dashboard/admin",
  vendor: "/dashboard/vendor",
  customer: "/dashboard/customer",
};

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const user = session?.user;
  const role = user?.role;
  const dashboardPath = role ? DASHBOARD_PATH[role] : "/dashboard";

  useEffect(() => {
    const dark = localStorage.getItem("pizzahub-theme") === "dark";

    document.documentElement.classList.toggle("dark", dark);

    // Synchronize React state after the component mounts
    const timer = window.setTimeout(() => {
      setIsDark(dark);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Close the profile dropdown when clicking outside.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");

    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);

    localStorage.setItem("pizzahub-theme", next ? "dark" : "light");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      return toast.error(error.message ?? "Logout failed.");
    }

    toast.success("Logged out successfully.");
    closeMenu();
    router.push("/");
    router.refresh();
  };

  const profileMenu = (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-medium text-gray-700 sm:block">
        {user?.name}
      </span>

      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-orange-600">
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name ?? "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <UserCircle size={22} />
        )}
      </div>

      <ChevronDown size={15} className="text-gray-400" />
    </div>
  );

  const dropdownItems = (
    <>
      <Link
        href={dashboardPath}
        onClick={closeMenu}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <LayoutDashboard size={17} />
        Dashboard
      </Link>

      <Link
        href={
          role === "vendor"
            ? "/dashboard/vendor/profile"
            : role === "admin"
              ? "/dashboard/admin"
              : "/dashboard/customer/profile"
        }
        onClick={closeMenu}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
      >
        <Settings size={17} />
        Profile Settings
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={17} />
        Logout
      </button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
            <Pizza size={26} />
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-[#29201D]">
            Pizza<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 font-medium text-gray-600 md:flex">
          <Link
            href="/"
            className="text-primary transition hover:text-primary"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="transition hover:text-primary"
          >
            Browse Menu
          </Link>
        </div>

        {/* Desktop Auth Navigation */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 text-gray-600 transition hover:border-primary hover:text-primary"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isPending ? (
            <span className="h-10 w-28 animate-pulse rounded-full bg-orange-50" />
          ) : user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-orange-100 py-1.5 pl-1.5 pr-3 transition hover:border-primary"
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
              >
                {profileMenu}
              </button>

              {isProfileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-orange-100 bg-white p-2 shadow-xl"
                >
                  <div className="border-b border-orange-50 px-3 pb-3 pt-2">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-col">{dropdownItems}</div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-full px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-primary"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-orange-50 md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-orange-100 bg-white px-5 py-5 shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-semibold text-primary transition hover:bg-orange-50"
            >
              Home
            </Link>

            <Link
              href="/menu"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-primary"
            >
              Browse Menu
            </Link>

            <div className="my-2 border-t border-orange-100" />

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 rounded-full border border-orange-200 px-5 py-3 font-semibold text-gray-700"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>

            {isPending ? (
              <div className="h-10 animate-pulse rounded-full bg-orange-50" />
            ) : user ? (
              <>
                <div className="flex items-center gap-3 rounded-lg bg-orange-50 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-orange-200 text-orange-700">
                    {user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name ?? "Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircle size={24} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardPath}
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  href={
                    role === "vendor"
                      ? "/dashboard/vendor/profile"
                      : role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/customer/profile"
                  }
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <Settings size={18} />
                  Profile Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="rounded-full border border-orange-200 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-orange-50"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className="rounded-full bg-primary px-5 py-3 text-center font-bold text-white transition hover:bg-red-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
