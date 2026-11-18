"use client";

import Link from "next/link";
import { MapPin, Utensils, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { getFeaturedItems } from "@/lib/menu-data";

const featuredItems = getFeaturedItems().map((i) => ({ ...i, image: i.images[0] }));

export default function FeaturedMenu() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
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

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              role="img"
              aria-label={item.name}
              className="h-56 w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url("${item.image}")`,
              }}
            />

            <div className="p-5">
              <p className="text-sm font-medium text-[#e94b35]">
                {item.category}
              </p>

              <h3 className="mt-2 text-xl font-bold text-[#2c211c]">
                {item.name}
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
                  {item.vendor}
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
        ))}
      </div>
    </section>
  );
}