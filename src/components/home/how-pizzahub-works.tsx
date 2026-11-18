"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Explore the Menu",
    description:
      "Browse different pizza categories and discover local restaurant menus.",
  },
  {
    number: "02",
    title: "Choose Your Favorite",
    description:
      "Select a menu item that you would love to enjoy.",
  },
  {
    number: "03",
    title: "Place Your Order",
    description:
      "Submit your order with the required delivery information.",
  },
];

export default function HowPizzaHubWorks() {
  return (
    <section className="bg-[#211916] px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-semibold tracking-widest text-[#ff9b45] uppercase">
            Simple Steps
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How PizzaHub Works
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
            Discover your favorite food and place an order in a few simple
            steps.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <span className="text-5xl font-extrabold text-[#e94b35]">
                {step.number}
              </span>

              <h3 className="mt-6 text-xl font-bold text-white">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-white/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}