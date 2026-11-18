import Link from "next/link";
import { connection } from "next/server";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Pizza,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Menu", href: "/menu" },
  { name: "Sign In", href: "/sign-in" },
  { name: "Sign Up", href: "/sign-up" },
];

const social = [
  {
    label: "Facebook",
    short: "FB",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com",
  },
  {
    label: "Instagram",
    short: "IG",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com",
  },
  {
    label: "YouTube",
    short: "YT",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://youtube.com",
  },
  {
    label: "X",
    short: "",
    href: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com",
  },
];

const contact = {
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@pizzahub.com",
  phone:
    process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+880 1700-000000",
  address:
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
    "Dhanmondi, Dhaka, Bangladesh",
};

export default async function Footer() {
  await connection();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#211916] text-gray-300">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand Information */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Pizza size={28} />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                Pizza<span className="text-primary">Hub</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Discover delicious pizzas from local vendors, explore exciting
              flavors, and make every meal special with PizzaHub.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold text-gray-300 transition hover:border-primary hover:bg-primary hover:text-white"
                >
                  {s.label === "X" ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    s.short
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-primary"
                  >
                    <span>{link.name}</span>

                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Contact Us
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-gray-400 transition hover:text-primary"
                >
                  {contact.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm text-gray-400 transition hover:text-primary"
                >
                  {contact.phone}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <span className="text-sm leading-6 text-gray-400">
                  {contact.address}
                </span>
              </li>
            </ul>
          </div>

          {/* PizzaHub Information */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              PizzaHub
            </h3>

            <p className="text-sm leading-7 text-gray-400">
              Good food brings people together. Explore local pizza shops
              and discover your next favorite meal with PizzaHub.
            </p>

            <Link
              href="/menu"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Explore Menu
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-sm text-gray-500">
            © {currentYear} PizzaHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}