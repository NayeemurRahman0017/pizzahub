"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Store, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { MenuItem } from "@/lib/types";

type State =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "missing" }
  | { kind: "ready"; item: MenuItem };

export default function MenuDetailsPage() {
  const { id: resolvedId } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({ kind: "loading" });

  const invalidId = Boolean(resolvedId) && !/^[a-f\d]{24}$/i.test(resolvedId);

  useEffect(() => {
    if (!resolvedId || invalidId) return;

    let cancelled = false;

    (async () => {
      try {
        const data = await api.get<{ item: MenuItem }>(
          `/api/menu/${resolvedId}`
        );
        if (!cancelled) setState({ kind: "ready", item: data.item });
      } catch (err) {
        if (cancelled) return;
        const status = (err as { status?: number }).status;
        if (status === 404) {
          setState({ kind: "missing" });
        } else {
          setState({
            kind: "error",
            message:
              err instanceof Error
                ? err.message
                : "Could not load this menu item.",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [resolvedId, invalidId]);

  if (invalidId) {
    return (
      <main className="min-h-screen bg-orange-50 px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Menu Item Not Found
          </h1>
          <p className="mt-2 text-gray-500">
            The menu item you are looking for does not exist or is no longer
            available.
          </p>
          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  if (state.kind === "loading") {
    return (
      <main className="grid min-h-screen place-items-center bg-orange-50">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Loader2 size={30} className="animate-spin text-primary" />
          <p className="text-sm">Loading menu item...</p>
        </div>
      </main>
    );
  }

  if (state.kind === "error") {
    return (
      <main className="min-h-screen bg-orange-50 px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-500">{state.message}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
            >
              <ArrowLeft size={18} />
              Back to Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (state.kind === "missing") {
    return (
      <main className="min-h-screen bg-orange-50 px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Menu Item Not Found
          </h1>
          <p className="mt-2 text-gray-500">
            The menu item you are looking for does not exist or is no longer
            available.
          </p>
          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  const item = state.item;
  const images =
    item.images?.length > 0
      ? item.images
      : ["https://images.unsplash.com/photo-1579751626657-72bc17010498?w=900"];

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/menu"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="grid min-h-80 grid-cols-3 gap-2 bg-orange-50 p-2 md:min-h-120 md:grid-cols-1">
              {images.slice(0, 3).map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`relative overflow-hidden rounded-2xl ${
                    index === 0
                      ? "col-span-3 md:col-span-1 md:row-span-2"
                      : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${item.itemName} view ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                {item.category}
              </span>

              <h1 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
                {item.itemName}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <Store size={19} className="text-primary" />
                <span>
                  {item.vendor?.businessName || item.vendor?.name}
                  {item.isPremiumVendor && (
                    <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-800">
                      Premium
                    </span>
                  )}
                </span>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-gray-600">
                <MapPin size={19} className="text-primary" />
                <span>{item.location}</span>
              </div>

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-primary">
                    ৳{item.price}
                  </p>
                </div>

                <Link
                  href={`/menu/${item.id}/order`}
                  className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}