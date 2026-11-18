"use client";

import { motion } from "motion/react";

const categories = [
  {
    name: "Classic Pizzas",
    icon: "🍕",
  },
  {
    name: "Vegetarian Pizzas",
    icon: "🥦",
  },
  {
    name: "Meat Lovers",
    icon: "🍗",
  },
  {
    name: "Specialty / Gourmet Pizzas",
    icon: "🧀",
  },
  {
    name: "Sides & Appetizers",
    icon: "🍟",
  },
  {
    name: "Beverages & Desserts",
    icon: "🥤",
  },
];

export default function PizzaCategories() {
  return (
    <section className="bg-[#fff0e7] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-semibold tracking-widest text-[#e94b35] uppercase">
            Find Your Favorite
          </p>

          <h2 className="text-3xl font-bold text-[#2c211c] sm:text-4xl">
            Pizza Categories
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#786d66]">
            Explore items by category and discover your favorite food.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <div className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#e94b35] hover:shadow-lg">
                <span className="text-4xl" aria-hidden="true">
                  {category.icon}
                </span>

                <h3 className="mt-4 text-sm font-bold text-[#2c211c] sm:text-base">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}