"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Utensils, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { api } from "@/lib/api";
import type { MenuItem, Paged } from "@/lib/types";

function FeaturedCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
    >
      <div
        role="img"
        aria-label={item.itemName}
        className="h-56 w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url("${item.images?.[0] ?? ""}")`,
        }}
      />

      <div className="p-5">
        <p className="text-sm font-medium text-[#e94b35]">
          {item.category}
        </p>

        <h3 className="mt-2 text-xl font-bold text-[#2c211c]">
          {item.itemName}
        </h3>

        <p className="mt-3 text-lg font-bold text-[#e94b35]">
          ৳{item.price}
        </p>

        <div className="mt-4 space-y-2 text-sm text-[#786d66]">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-[#e94b35]" />
            {item.location}
          </p>

          <p className="flex items-center gap-2">
            <Utensils size={16} className="text-[#e94b35]" />
            {item.vendor?.businessName || item.vendor?.name}
          </p>
        </div>

        <Link
          href={`/menu/${item.id}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#fff0e7] px-4 py-3 font-semibold text-[#e94b35] transition hover:bg-[#e94b35] hover:text-white"
        >
          View Details
          <ArrowRight size={17} />
        </Link>
      </div>
    </motion.article>
  );
}

function FeaturedSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-96 animate-pulse rounded-2xl border border-orange-100 bg-white"
        />
      ))}
    </>
  );
}

export default function FeaturedMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await api.get<{ items: MenuItem[] }>("/api/menu/featured");
        if (!cancelled) setItems(data.items ?? []);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 mt-6 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p className="mb-3 font-semibold tracking-widest text-[#e94b35] uppercase">
          Discover Our Menu
        </p>

        <h2 className="text-3xl font-bold text-[#2c211c] sm:text-4xl">
          Featured Menu Items
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#786d66]">
          Explore delicious food choices from local restaurant vendors.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <FeaturedSkeleton />
        </div>
      ) : failed ? (
        <div className="rounded-2xl border border-orange-100 bg-white p-10 text-center">
          <p className="font-semibold text-[#2c211c]">
            Could not load featured items
          </p>
          <p className="mt-2 text-sm text-[#786d66]">
            Please refresh the page or try again later.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-orange-100 bg-white p-10 text-center">
          <p className="font-semibold text-[#2c211c]">
            No featured items yet
          </p>
          <p className="mt-2 text-sm text-[#786d66]">
            Approved menu items from our vendors will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
