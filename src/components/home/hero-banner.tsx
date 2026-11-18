"use client";

import Link from "next/link";
import { ArrowRight, Pizza } from "lucide-react";
import { motion } from "motion/react";

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-155 items-center overflow-hidden bg-[#211916]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1800')",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#211916]/95 via-[#211916]/80 to-[#211916]/30" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-sm font-medium text-orange-300"
        >
          <Pizza size={17} />
          Welcome to PizzaHub
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-4xl leading-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hot & Fresh Pizza
          <span className="block text-[#ff9b45]">
            Delivered to Your Door
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg"
        >
          Discover delicious pizzas and explore menus from local
          restaurants. Find your favorite food with PizzaHub.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="mt-9"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 rounded-full bg-[#e94b35] px-7 py-4 font-semibold text-white transition hover:bg-[#cf3928]"
          >
            Explore Pizza Menu
            <ArrowRight size={19} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}