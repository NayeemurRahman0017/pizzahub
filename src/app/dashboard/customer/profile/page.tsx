"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { User, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function CustomerProfilePage() {
  const [name, setName] = useState("John Customer");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Backend integration will be added later.
    toast.success("Profile updated successfully!");
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
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}