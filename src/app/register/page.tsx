"use client";

import Link from "next/link";
import { useState } from "react";
import { Pizza, User, Mail, LockKeyhole } from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState("customer");

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-orange-600"
        >
          <Pizza size={32} />
          PizzaHub
        </Link>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="mt-2 text-gray-500">
            Join PizzaHub and enjoy delicious food!
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3">
              <User size={19} className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3">
              <Mail size={19} className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3">
              <LockKeyhole size={19} className="text-gray-400" />
              <input
                type="password"
                placeholder="Create a password"
                required
                minLength={6}
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Register As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 outline-none focus:border-orange-500"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-gray-500 hover:text-orange-600"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}