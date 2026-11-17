"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Pizza } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold text-orange-600"
        >
          <Pizza size={32} />
          PizzaHub
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="mt-2 text-gray-500">
            Login to continue your delicious journey.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-orange-500">
              <Mail size={19} className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-orange-500">
              <LockKeyhole size={19} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-orange-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-orange-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

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