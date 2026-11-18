
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ArrowLeft, ImagePlus } from "lucide-react";

export default function EditMenuItemPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    itemName: "Margherita Classic",
    category: "Classic Pizzas",
    description: "Classic pizza with tomato sauce and mozzarella cheese.",
    price: "450",
    location: "Dhanmondi, Dhaka",
  });

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("Menu item updated successfully.");

    // Backend update will be connected later.

    setTimeout(() => {
      router.push("/dashboard/vendor/menu");
    }, 1000);
  };

  return (
    <DashboardShell role="vendor">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            href="/dashboard/vendor/menu"
            className="mb-4 inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={17} />
            Back to My Menu Items
          </Link>

          <h2 className="text-2xl font-bold text-gray-800">
            Edit Menu Item
          </h2>

          <p className="mt-1 text-gray-500">
            Update your menu item information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Item Name
            </label>

            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price (৳)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Item Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 bg-orange-50 p-8 text-center hover:bg-orange-100">
              <ImagePlus
                size={35}
                className="mb-3 text-orange-500"
              />

              <span className="font-semibold text-gray-700">
                {image ? image.name : "Choose a new item image"}
              </span>

              <span className="mt-1 text-xs text-gray-500">
                Select a new image only if you want to replace the current one
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
            Changes will be connected to the menu item in the database later.
          </div>

          {message && (
            <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
              {message}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/vendor/menu"
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Update Menu Item
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
