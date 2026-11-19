"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { User, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { AdminUser } from "@/lib/types";

export default function CustomerProfilePage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.get<{ user: AdminUser }>("/api/profile/me");
        if (!cancelled) {
          setName(data.user.name ?? "");
          setImage(data.user.image ?? "");
        }
      } catch (err) {
        if (!cancelled) {
          toast.error(
            err instanceof Error ? err.message : "Could not load your profile."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch("/api/profile/me", {
        name: name.trim(),
        image: image.trim(),
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardShell role="customer">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="mt-2 text-gray-500">
            Update your personal information.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2 size={20} className="animate-spin text-orange-500" />
            <span className="text-sm">Loading your profile...</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={16} />
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={80}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImageIcon size={16} />
                Profile Image URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            {image && (
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Image Preview
                </p>
                <Image
                  src={image}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  unoptimized
                  className="h-24 w-24 rounded-full border object-cover"
                />
              </div>
            )}

            <div className="rounded-xl bg-orange-50 p-4 text-sm text-orange-800">
              Your account role and subscription status cannot be changed from
              profile settings.
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </DashboardShell>
  );
}
