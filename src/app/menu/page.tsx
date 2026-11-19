"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ShoppingBag, Crown } from "lucide-react";
import { api } from "@/lib/api";
import { CATEGORIES, LOCATIONS } from "@/lib/menu-data";
import type { MenuItem, Pagination } from "@/lib/types";

const select =
  "rounded-xl border border-gray-200 bg-white px-5 py-3.5 outline-none focus:border-primary";

type SortKey = "featured" | "priceAsc" | "priceDesc";

function MenuContent() {
  const params = useSearchParams();
  const initialCategory = params.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    initialCategory &&
    (CATEGORIES as readonly string[]).includes(initialCategory)
      ? initialCategory
      : "All"
  );
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<MenuItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounced search so we do not fire a request per keystroke.
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(search), 400);
    return () => window.clearTimeout(t);
  }, [search]);

  // Reset to page 1 whenever the filters change.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, location, sort]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<{ items: MenuItem[]; pagination: Pagination }>(
        "/api/menu",
        {
          search: debouncedSearch || undefined,
          category: category === "All" ? undefined : category,
          location: location === "All" ? undefined : location,
          sort,
          page,
          limit: 12,
        }
      );
      setItems(data.items ?? []);
      setPagination(data.pagination ?? null);
    } catch (err) {
      setItems([]);
      setPagination(null);
      setError(
        err instanceof Error ? err.message : "Could not load the menu."
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, location, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  // Location options: the seeded list plus whatever the API returns,
  // so vendors using a different area stay filterable.
  const locationOptions = Array.from(
    new Set([...LOCATIONS, ...items.map((i) => i.location).filter(Boolean)])
  );

  const totalPages = pagination?.totalPages ?? 1;

  return (
    <main className="min-h-screen bg-orange-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            PizzaHub Menu
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Find Your Perfect Pizza
          </h1>
          <p className="mt-4 max-w-2xl text-gray-500">
            Browse delicious food from our trusted vendors and find your next
            favorite meal.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or vendor..."
                aria-label="Search menu items"
                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-primary"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
              className={select}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Filter by location"
              className={select}
            >
              <option value="All">All Locations</option>
              {locationOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort menu items"
              className={select}
            >
              <option value="featured">Featured</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-104 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">
              Could not load the menu
            </h3>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <button
              onClick={load}
              className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">No items found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try a different search term, category or location.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">
              {pagination?.total ?? items.length} item
              {(pagination?.total ?? items.length) !== 1 && "s"} found
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-56 shrink-0">
                    <Image
                      src={item.images?.[0] ?? ""}
                      alt={item.itemName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow">
                      {item.category}
                    </span>
                    {item.isPremiumVendor && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-950 shadow">
                        <Crown size={12} /> Premium
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.itemName}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {item.vendor?.businessName || item.vendor?.name}
                        </p>
                      </div>
                      <p className="whitespace-nowrap text-lg font-bold text-gray-900">
                        ৳{item.price}
                      </p>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                      {item.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-gray-500">
                      Location: {item.location}
                    </p>

                    <Link
                      href={`/menu/${item.id}`}
                      className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                      <ShoppingBag size={17} /> View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-orange-200 border-t-primary" />
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
