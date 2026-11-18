"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Globe2, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/layout/logo";
import { authClient } from "@/lib/auth-client";

function getCallbackUrl() {
  const cb = new URLSearchParams(window.location.search).get("callbackUrl");
  return cb && cb.startsWith("/") && !cb.startsWith("//") ? cb : "/dashboard";
}

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("blocked")) {
      authClient.signOut().finally(() => toast.error("Your account has been blocked. Please contact support."));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setLoading(false);
      toast.error(error.message ?? "Invalid email or password.");
      return;
    }
    const { data } = await authClient.getSession();
    if (data?.user.isBlocked) {
      await authClient.signOut();
      setLoading(false);
      toast.error("Your account has been blocked. Please contact support.");
      return;
    }
    toast.success("Signed in successfully.");
    router.push(getCallbackUrl());
    router.refresh();
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: getCallbackUrl() });
    if (error) toast.error(error.message ?? "Google sign-in failed.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="mt-2 text-gray-500">Sign in to continue your delicious journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">Email Address</label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-primary">
              <Mail size={19} className="text-gray-400" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
            <div className="flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-primary">
              <LockKeyhole size={19} className="text-gray-400" />
              <input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-transparent px-3 py-3 text-gray-800 outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 transition hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" /><span className="text-sm text-gray-400">OR</span><div className="h-px flex-1 bg-gray-200" />
        </div>

        <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
          <Globe2 size={19} /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account? <Link href="/sign-up" className="font-semibold text-primary hover:underline">Sign Up</Link>
        </p>
        <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-primary">← Back to Home</Link>
      </div>
    </main>
  );
}