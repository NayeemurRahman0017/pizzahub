"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ImagePlus, ArrowLeft } from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";

import { uploadToImgBB } from "@/lib/imgbb";
import { api } from "@/lib/api";
import type { SubscriptionInfo } from "@/lib/types";

export default function AddMenuItemPage() {
  const router = useRouter();

  // Saving state
  const [saving, setSaving] = useState(false);

  // Real free-plan usage from the backend (null limit = unlimited/Premium)
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.get<SubscriptionInfo>("/api/subscriptions/me");
        if (!cancelled) setSub(data);
      } catch {
        // Silently fall back to letting the server enforce the limit.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isPremium = sub?.plan === "premium";
  const limit = sub?.activeItemLimit ?? 3;
  const activeCount = sub?.activeItems ?? 0;
  const limitReached = !isPremium && sub !== null && activeCount >= limit;

  // Form data
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    price: "",
    location: "",
  });

  // Selected image
  const [image, setImage] = useState<File | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (limitReached) {
      return toast.error(
        "Free plan allows only 3 active items. Upgrade to Premium."
      );
    }

    if (!image) {
      return toast.error("Please select an item image.");
    }

    setSaving(true);

    try {
      // Upload image to ImgBB
      const imageUrl = await uploadToImgBB(image);

      // Status defaults to "pending" on the server until an admin approves.
      await api.post("/api/vendor/menu-items", {
        itemName: formData.itemName.trim(),
        category: formData.category,
        description: formData.description.trim(),
        price: Number(formData.price),
        location: formData.location.trim(),
        images: [imageUrl],
      });

      toast.success(
        "Menu item submitted. It will appear after admin approval."
      );

      router.push("/dashboard/vendor/menu");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not save the item."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardShell role="vendor">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Page Heading */}
        <div>
          <Link
            href="/dashboard/vendor/menu"
            className="mb-4 inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={17} />
            Back to My Menu Items
          </Link>

          <h2 className="text-2xl font-bold text-gray-800">
            Add New Menu Item
          </h2>

          <p className="mt-1 text-gray-500">
            Add a new pizza or food item to your menu.
          </p>
        </div>

        {/* Free Plan Limit Warning */}
        {limitReached && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            Free plan limit reached ({limit} active items).{" "}
            <Link
              href="/dashboard/vendor/subscription"
              className="font-semibold underline"
            >
              Upgrade to Premium
            </Link>
          </div>
        )}

        {/* Add Menu Item Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
        >
          {/* Item Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Item Name
            </label>

            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Enter item name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="">Select category</option>
              <option value="Classic Pizzas">Classic Pizzas</option>
              <option value="Vegetarian Pizzas">Vegetarian Pizzas</option>
              <option value="Meat Lovers">Meat Lovers</option>
              <option value="Specialty / Gourmet Pizzas">
                Specialty / Gourmet Pizzas
              </option>
              <option value="Sides & Appetizers">
                Sides & Appetizers
              </option>
              <option value="Beverages & Desserts">
                Beverages & Desserts
              </option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your menu item..."
              required
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Price and Location */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price (৳)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="1"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Area / City"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Item Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Item Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 bg-orange-50 p-8 text-center hover:bg-orange-100">
              <ImagePlus size={35} className="mb-3 text-orange-500" />

              <span className="font-semibold text-gray-700">
                {image ? image.name : "Choose an item image"}
              </span>

              <span className="mt-1 text-xs text-gray-500">
                Select an image file
              </span>

              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          {/* Approval Notice */}
          <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
            New menu items will have Pending status until an admin approves
            them.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving || limitReached}
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add Menu Item"}
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}