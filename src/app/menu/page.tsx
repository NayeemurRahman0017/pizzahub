"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ShoppingBag, Crown } from "lucide-react";
import { CATEGORIES, LOCATIONS, getPublicItems } from "@/lib/menu-data";

const select = "rounded-xl border border-gray-200 bg-white px-5 py-3.5 outline-none focus:border-primary";

function MenuContent() {
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    initialCategory && (CATEGORIES as readonly string[]).includes(initialCategory) ? initialCategory : "All"
  );
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 500); // replace with real API loading state
    return () => window.clearTimeout(t);
  }, []);

  const items = getPublicItems()
    .filter((i) => {
      const q = search.toLowerCase();
      return (
        (i.name.toLowerCase().includes(q) || i.vendor.toLowerCase().includes(q)) &&
        (category === "All" || i.category === category) &&
        (location === "All" || i.location === location)
      );
    })
    .sort((a, b) =>
      sort === "priceAsc" ? a.price - b.price : sort === "priceDesc" ? b.price - a.price : a.id - b.id
    );

  return (
    <main className="min-h-screen bg-orange-50">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">PizzaHub Menu</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">Find Your Perfect Pizza</h1>
          <p className="mt-4 max-w-2xl text-gray-500">Browse delicious food from our trusted vendors and find your next favorite meal.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or vendor..." className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-primary" />
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className={select}>
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Filter by location" className={select}>
              <option value="All">All Locations</option>
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort menu items" className={select}>
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
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-104 animate-pulse rounded-2xl bg-white" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">No items found</h3>
            <p className="mt-2 text-sm text-gray-500">Try a different search term, category or location.</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-500">{items.length} item{items.length !== 1 && "s"} found</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-56 shrink-0">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow">{item.category}</span>
                    {item.premium && (
                      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-950 shadow">
                        <Crown size={12} /> Premium
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm font-medium text-primary">{item.vendor}</p>
                      </div>
                      <p className="whitespace-nowrap text-lg font-bold text-gray-900">৳{item.price}</p>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">{item.description}</p>
                    <p className="mt-3 text-sm font-medium text-gray-500">Location: {item.location}</p>
                    <Link href={`/menu/${item.id}`} className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                      <ShoppingBag size={17} /> View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="grid min-h-[60vh] place-items-center"><span className="h-6 w-6 animate-spin rounded-full border-2 border-orange-200 border-t-primary" /></div>}>
      <MenuContent />
    </Suspense>
  );
}