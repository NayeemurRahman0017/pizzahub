"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Pizza,
  Globe2,
  Image as ImageIcon,
} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const passwordValid =
    hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordValid) {
      return;
    }

    // Registration/authentication will be connected later.
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold text-orange-600"
        >
          <Pizza size={32} />
          PizzaHub
        </Link>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join PizzaHub and discover delicious pizzas.
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User size={16} />
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Mail size={16} />
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ImageIcon size={16} />
              Profile Image
              <span className="font-normal text-gray-400">
                (Optional)
              </span>
            </label>

            <input
              type="url"
              placeholder="https://example.com/profile.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <LockKeyhole size={16} />
              Password
            </label>

            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-orange-500">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full bg-transparent px-1 py-3 text-gray-800 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 transition hover:text-orange-600"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-3 space-y-1 text-xs">
              <p
                className={
                  hasMinLength ? "text-green-600" : "text-gray-400"
                }
              >
                {hasMinLength ? "✓" : "○"} At least 6 characters
              </p>

              <p
                className={
                  hasUppercase ? "text-green-600" : "text-gray-400"
                }
              >
                {hasUppercase ? "✓" : "○"} One uppercase letter
              </p>

              <p
                className={
                  hasLowercase ? "text-green-600" : "text-gray-400"
                }
              >
                {hasLowercase ? "✓" : "○"} One lowercase letter
              </p>
            </div>
          </div>

          {/* Account Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Account Role
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                  role === "customer"
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                  role === "vendor"
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Vendor
              </button>
            </div>
          </div>

          {/* Create Account */}
          <button
            type="submit"
            disabled={!passwordValid}
            className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">OR</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <Globe2 size={19} />
          Continue with Google
        </button>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-orange-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Back Home */}
        <Link
          href="/"
          className="mt-6 block text-center text-sm text-gray-500 hover:text-orange-600"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
