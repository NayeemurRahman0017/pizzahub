
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Moon, Pizza, Sun, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem("pizzahub-theme") === "dark";

    document.documentElement.classList.toggle("dark", dark);

    // Synchronize React state after the component mounts
    const timer = window.setTimeout(() => {
      setIsDark(dark);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");

    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);

    localStorage.setItem(
      "pizzahub-theme",
      next ? "dark" : "light"
    );
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
        {/* Authentication will be connected later */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 text-gray-600 transition hover:border-primary hover:text-primary"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-orange-50 md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
          </div>
        </div>
      )}
    </header>
  );
}
