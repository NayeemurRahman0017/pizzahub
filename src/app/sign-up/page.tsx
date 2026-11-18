"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Globe2, Image as ImageIcon, LockKeyhole, Mail, Store, User } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/layout/logo";
import { authClient } from "@/lib/auth-client";
import { uploadToImgBB } from "@/lib/imgbb";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const passwordValid = hasMinLength && hasUppercase && hasLowercase;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordValid) return toast.error("Password does not meet the requirements.");
    if (role === "vendor" && !businessName.trim()) return toast.error("Please enter your restaurant name.");

    setLoading(true);
    let image: string | undefined;
    if (photo) {
      try {
        image = await uploadToImgBB(photo);
      } catch (err) {
        setLoading(false);
        return toast.error(err instanceof Error ? err.message : "Image upload failed.");
      }
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      role,
      businessName: role === "vendor" ? businessName : undefined,
    });
    if (error) {
      setLoading(false);
      return toast.error(error.message ?? "Registration failed.");
    }
    toast.success("Account created successfully!");
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
    if (error) toast.error(error.message ?? "Google sign-up failed.");
  };

  const rule = (ok: boolean, text: string) => (
    <p className={ok ? "text-green-600" : "text-gray-400"}>{ok ? "✓" : "○"} {text}</p>
  );
  const field = "flex items-center rounded-lg border border-gray-300 px-3 focus-within:border-primary";
  const input = "w-full bg-transparent px-3 py-3 text-gray-800 outline-none";
  const label = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-500">Join PizzaHub today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={label}>Full Name</label>
            <div className={field}><User size={19} className="text-gray-400" />
              <input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className={input} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={label}>Email Address</label>
            <div className={field}><Mail size={19} className="text-gray-400" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={input} />
            </div>
          </div>
          <div>
            <label htmlFor="photo" className={label}>Profile Image <span className="font-normal text-gray-400">(optional)</span></label>
            <label className={`${field} cursor-pointer py-3 text-sm text-gray-500`}>
              <ImageIcon size={19} className="mr-3 text-gray-400" />
              {photo ? photo.name : "Choose an image (you can skip)"}
              <input id="photo" type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
            </label>
          </div>
          <div>
            <label htmlFor="password" className={label}>Password</label>
            <div className={field}><LockKeyhole size={19} className="text-gray-400" />
              <input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className={input} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              {rule(hasMinLength, "At least 6 characters")}
              {rule(hasUppercase, "One uppercase letter")}
              {rule(hasLowercase, "One lowercase letter")}
            </div>
          </div>
          <div>
            <span className={label}>Account Role</span>
            <div className="grid grid-cols-2 gap-3">
              {(["customer", "vendor"] as const).map((r) => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${role === r ? "border-primary bg-orange-50 text-primary" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}>
                  {r === "customer" ? "Customer" : "Vendor (Restaurant Owner)"}
                </button>
              ))}
            </div>
          </div>
          {role === "vendor" && (
            <div>
              <label htmlFor="business" className={label}>Restaurant Name</label>
              <div className={field}><Store size={19} className="text-gray-400" />
                <input id="business" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your restaurant name" className={input} />
              </div>
            </div>
          )}
          <button type="submit" disabled={!passwordValid || loading} className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" /><span className="text-sm text-gray-400">OR</span><div className="h-px flex-1 bg-gray-200" />
        </div>
        <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50">
          <Globe2 size={19} /> Sign up with Google
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/sign-in" className="font-semibold text-primary hover:underline">Sign In</Link>
        </p>
      </div>
    </main>
  );
}