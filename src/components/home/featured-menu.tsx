"use client";

import Link from "next/link";
import { MapPin, Utensils, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

// Temporary demo data.
// Backend integration হলে database থেকে approved এবং active items আসবে।
const featuredItems = [
  {
    id: "demo-1",
    name: "Margherita Classic",
    category: "Classic Pizzas",
    price: 450,
    location: "Dhanmondi, Dhaka",
    vendor: "Pizza Corner",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  },
  {
    id: "demo-2",
    name: "Pepperoni Feast",
    category: "Meat Lovers",
    price: 650,
    location: "Gulshan, Dhaka",
    vendor: "Italian Pizza House",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
  },
  {
    id: "demo-3",
    name: "Veggie Supreme",
    category: "Vegetarian Pizzas",
    price: 520,
    location: "Banani, Dhaka",
    vendor: "Green Oven",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
  {
    id: "demo-4",
    name: "Four Cheese Pizza",
    category: "Specialty / Gourmet Pizzas",
    price: 750,
    location: "Uttara, Dhaka",
    vendor: "Cheese Factory",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800",
  },
  {
    id: "demo-5",
    name: "Crispy Garlic Bread",
    category: "Sides & Appetizers",
    price: 220,
    location: "Mirpur, Dhaka",
    vendor: "Pizza Corner",
    image:
      "https://images.unsplash.com/photo-1619531040576-f9416740661b?w=800",
  },
  {
    id: "demo-6",
    name: "Chocolate Dessert",
    category: "Beverages & Desserts",
    price: 280,
    location: "Dhanmondi, Dhaka",
    vendor: "Sweet Oven",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
  },
];

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