
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { CATEGORIES } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/types";

type State =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready" };

export default function EditMenuItemPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [state, setState] = useState<State>({ kind: "loading" });
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    price: "",
    location: "",
  });
  const [currentImage, setCurrentImage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const id = params.id;
    if (!id) return;
    let cancelled = false;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      setState({ kind: "error", message: "Invalid menu item id." });
      return;
    }

    (async () => {
      try {
        const data = await api.get<{ item: MenuItem }>(
          `/api/vendor/menu-items/${id}`
        );
        if (cancelled) return;
        const item = data.item;
        setFormData({
          itemName: item.itemName,
          category: item.category,
          description: item.description,
          price: String(item.price),
          location: item.location,
        });
        setCurrentImage(item.images?.[0] ?? "");
        setState({ kind: "ready" });
      } catch (err) {
        if (cancelled) return;
        setState({
          kind: "error",
          message:
            err instanceof Error ? err.message : "Could not load the item.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      let images: string[] = [currentImage].filter(Boolean);
      if (image) {
        const url = await uploadToImgBB(image);
        images = [url];
      }

      if (images.length === 0) {
        throw new Error("Please provide an item image.");
      }

      await api.put(`/api/vendor/menu-items/${params.id}`, {
        itemName: formData.itemName.trim(),
        category: formData.category,
        description: formData.description.trim(),
        price: Number(formData.price),
        location: formData.location.trim(),
        images,
      });

      toast.success("Menu item updated. It will be re-reviewed by an admin.");
      router.push("/dashboard/vendor/menu");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update the item."
      );
      setSaving(false);
    }
  };

  if (state.kind === "loading") {
    return (
      <DashboardShell role="vendor">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 size={20} className="animate-spin text-orange-500" />
          <span className="text-sm">Loading menu item...</span>
        </div>
      </DashboardShell>
    );
  }

  if (state.kind === "error") {
    return (
      <DashboardShell role="vendor">
        <div className="space-y-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {state.message}
          </div>
          <Link
            href="/dashboard/vendor/menu"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700"
          >
            <ArrowLeft size={17} /> Back to My Menu Items
          </Link>
        </div>
      </DashboardShell>
    );
  }

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
              minLength={2}
              maxLength={100}
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
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
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
              minLength={10}
              maxLength={1000}
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
                step="1"
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
                minLength={2}
                maxLength={100}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Item Image
            </label>

            {currentImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentImage}
                alt="Current item"
                className="mb-3 h-28 w-28 rounded-xl object-cover"
              />
            )}

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 bg-orange-50 p-8 text-center hover:bg-orange-100">
              <ImagePlus size={35} className="mb-3 text-orange-500" />

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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
            Edited items go back to Pending and are re-reviewed by an admin
            before customers can see them.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/vendor/menu"
              className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Menu Item"}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
