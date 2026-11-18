"use client";

import { ChefHat, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: ChefHat,
    title: "Delicious Choices",
    description:
      "Explore different pizzas and food items from local restaurants.",
  },
  {
    icon: ShieldCheck,
    title: "Approved Vendors",
    description:
      "Discover menu items published by approved restaurant vendors.",
  },
  {
    icon: Truck,
    title: "Easy Ordering",
    description:
      "Find your favorite food and place your order with ease.",
  },
];

export default function WhyChoosePizzaHub() {
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
          Why PizzaHub
        </p>

        <h2 className="text-3xl font-bold text-[#2c211c] sm:text-4xl">
          Why Choose PizzaHub?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#786d66]">
          We make it easier to discover local restaurants and explore
          delicious menu options.
        </p>
      </motion.div>

      <div className="grid gap-7 md:grid-cols-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0e7] text-[#e94b35]">
                <Icon size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#2c211c]">
                {benefit.title}
              </h3>

              <p className="mt-3 leading-7 text-[#786d66]">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}