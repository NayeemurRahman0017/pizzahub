"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Save, UserRound } from "lucide-react";
import { toast } from "sonner";
import { authClient, useSession } from "@/lib/auth-client";

type VendorProfileFormProps = {
  initialName: string;
  initialBusinessName: string;
  initialImage: string;
};

function VendorProfileForm({
  initialName,
  initialBusinessName,
  initialImage,
}: VendorProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [image, setImage] = useState(initialImage);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image: image || undefined,
        businessName,
      });

      if (error) {
        toast.error(error.message ?? "Could not update profile.");
        return;
      }

      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-orange-600">
          Vendor Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900">
          Profile Settings
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your personal and restaurant information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >
        {/* Profile Information */}
        <div className="flex items-center gap-4 border-b pb-6">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-orange-100">
            {image ? (
              <Image
                src={image}
                alt="Profile"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={30} className="text-orange-600" />
            )}
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Profile Information
            </h2>

            <p className="text-sm text-gray-500">
              Update your profile details below.
            </p>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-orange-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Restaurant Name */}
        <div className="space-y-2">
          <label
            htmlFor="businessName"
            className="text-sm font-medium text-gray-700"
          >
            Restaurant Name
          </label>

          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-orange-500"
            placeholder="Enter restaurant name"
          />
        </div>

        {/* Profile Image */}
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700"
          >
            Profile Image URL (Optional)
          </label>

          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-orange-500"
            placeholder="https://example.com/profile.jpg"
          />

          <p className="text-xs text-gray-500">
            Enter an image URL to preview your profile picture.
          </p>
        </div>

        {/* Restricted Account Information */}
        <div className="border-t pt-5">
          <p className="text-sm text-gray-500">
            Your account role and subscription plan cannot be changed from
            profile settings.
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default function VendorProfilePage() {
  const { data: session } = useSession();

  return (
    <DashboardShell role="vendor">
      {!session?.user ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading profile...
        </div>
      ) : (
        <VendorProfileForm
          key={session.user.id}
          initialName={session.user.name ?? ""}
          initialBusinessName={session.user.businessName ?? ""}
          initialImage={session.user.image ?? ""}
        />
      )}
    </DashboardShell>
  );
}