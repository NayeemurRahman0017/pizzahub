"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Pizza,
  ShieldCheck,
  Truck,
  Star,
  ChefHat,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";

const categories = [
  { name: "Classic Pizzas", icon: "🍕" },
  { name: "Vegetarian", icon: "🥦" },
  { name: "Meat Lovers", icon: "🍗" },
  { name: "Specialty", icon: "🧀" },
  { name: "Sides & Appetizers", icon: "🍟" },
  { name: "Drinks & Desserts", icon: "🥤" },
];

const pizzas = [
  {
    name: "Margherita Classic",
    category: "Classic Pizza",
    price: 450,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700",
    location: "Dhaka",
  },
  {
    name: "Pepperoni Feast",
    category: "Meat Lovers",
    price: 650,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700",
    location: "Dhanmondi",
  },
  {
    name: "Veggie Supreme",
    category: "Vegetarian",
    price: 520,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700",
    location: "Gulshan",
  },
];

const features = [
  {
    icon: <ChefHat size={25} />,
    title: "Quality Ingredients",
    description: "Fresh ingredients and delicious flavors in every bite.",
  },
  {
    icon: <Truck size={25} />,
    title: "Easy Ordering",
    description: "Find your favorite pizza and order with ease.",
  },
  {
    icon: <ShieldCheck size={25} />,
    title: "Trusted Vendors",
    description: "Discover menus from approved local pizza vendors.",
  },
  {
    icon: <Clock size={25} />,
    title: "Order Tracking",
    description: "Keep track of your order from your dashboard.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore Menu",
    description: "Discover delicious pizzas from local vendors.",
  },
  {
    number: "02",
    title: "Place Your Order",
    description: "Choose your pizza and provide delivery details.",
  },
  {
    number: "03",
    title: "Enjoy Your Pizza",
    description: "Track your order and enjoy your favorite pizza.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <Pizza size={26} />
            </span>

            <span className="text-2xl font-extrabold tracking-tight">
              Pizza<span className="text-primary">Hub</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 font-medium text-gray-600 md:flex">
            <Link href="/" className="text-primary">
              Home
            </Link>

            <Link href="/menu" className="transition hover:text-primary">
              Explore Menu
            </Link>

            <a href="#categories" className="transition hover:text-primary">
              Categories
            </a>

            <a href="#about" className="transition hover:text-primary">
              About Us
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden rounded-full px-5 py-2.5 font-semibold transition hover:bg-orange-50 sm:block"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative bg-[#FFF5E9]">
        <div className="mx-auto grid min-h-147.5 max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
              <Star size={16} fill="currentColor" />
              Your favorite pizza marketplace
            </span>

            <h1 className="max-w-xl text-5xl leading-[1.12] font-black tracking-tight text-[#29201D] sm:text-6xl lg:text-7xl">
              Happiness is just a{" "}
              <span className="text-primary">pizza</span> away.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Discover amazing pizzas from local vendors. Explore flavors,
              place your order, and make every meal special with PizzaHub.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-700"
              >
                Explore Menu <ArrowRight size={19} />
              </Link>

              <a
                href="#how-it-works"
                className="rounded-full border border-orange-200 bg-white px-7 py-4 font-bold text-gray-800 transition hover:bg-orange-50"
              >
                How It Works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm font-medium text-gray-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="text-primary" size={19} />
                Trusted Vendors
              </span>

              <span className="flex items-center gap-2">
                <Truck className="text-primary" size={19} />
                Easy Ordering
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-137.5"
          >
            <div className="absolute inset-8 rounded-full bg-orange-300/40 blur-3xl" />

            <div className="relative aspect-square w-full">
              <Image
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000"
                alt="Freshly baked delicious pizza"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-full border-12 border-white object-cover shadow-2xl"
              />
            </div>

            <div className="absolute -bottom-2 left-0 rounded-2xl bg-white p-4 shadow-xl sm:-left-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                  🍕
                </span>

                <div>
                  <p className="font-extrabold text-gray-900">
                    Made with Love
                  </p>
                  <p className="text-xs text-gray-500">Fresh & Delicious</p>
                </div>
              </div>
            </div>

            <div className="absolute top-8 right-0 rounded-2xl bg-primary px-5 py-3 text-white shadow-xl">
              <p className="text-xs font-medium">Pizza lovers</p>
              <p className="text-xl font-black">Welcome!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <div className="mb-12 text-center">
          <span className="font-bold tracking-widest text-primary uppercase">
            Explore Categories
          </span>

          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Something for Every Craving
          </h2>

          <p className="mt-3 text-gray-500">
            Find the perfect flavor for every moment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href="/menu"
                className="group flex min-h-40 flex-col items-center justify-center rounded-2xl border border-orange-100 bg-[#FFFAF5] p-5 text-center transition hover:-translate-y-2 hover:border-primary hover:bg-white hover:shadow-xl"
              >
                <span className="text-4xl transition group-hover:scale-110">
                  {category.icon}
                </span>

                <h3 className="mt-4 text-sm font-bold text-gray-800">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="bg-[#FFF5E9] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="font-bold tracking-widest text-primary uppercase">
                Customer Favorites
              </span>

              <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
                Featured Pizzas
              </h2>

              <p className="mt-3 text-gray-500">
                Explore some delicious choices.
              </p>
            </div>

            <Link
              href="/menu"
              className="flex items-center gap-2 font-bold text-primary transition hover:gap-4"
            >
              View All <ArrowUpRight size={20} />
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {pizzas.map((pizza, index) => (
              <motion.article
                key={pizza.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />

                  <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary">
                    {pizza.category}
                  </span>

                  <button
                    type="button"
                    aria-label={`Add ${pizza.name} to favorites`}
                    className="absolute top-4 right-4 rounded-full bg-white p-2.5 text-gray-600 transition hover:text-primary"
                  >
                    <Heart size={19} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-extrabold text-gray-900">
                      {pizza.name}
                    </h3>

                    <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-orange-500">
                      <Star size={16} fill="currentColor" />
                      {pizza.rating}
                    </span>
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    {pizza.location}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <p className="text-2xl font-black text-primary">
                      ৳{pizza.price}
                    </p>

                    <Link
                      href="/menu"
                      className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
      >
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-bold tracking-widest text-primary uppercase">
            Why PizzaHub?
          </span>

          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            More Than Just Pizza
          </h2>

          <p className="mt-4 text-gray-500">
            A simple and convenient way to discover local pizza vendors and
            enjoy your favorite food.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-orange-100 bg-white p-7 transition hover:-translate-y-2 hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-primary">
                {feature.icon}
              </span>

              <h3 className="mt-6 text-lg font-extrabold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-[#29201D] py-24 text-white"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="font-bold tracking-widest text-orange-300 uppercase">
              Simple Process
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              How PizzaHub Works
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-black">
                  {step.number}
                </span>

                <h3 className="mt-6 text-xl font-extrabold">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs leading-7 text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white transition hover:bg-red-700"
            >
              Start Exploring <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F1917] px-5 py-12 text-gray-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <Pizza className="text-primary" size={28} />

              <span className="text-2xl font-black">
                Pizza<span className="text-primary">Hub</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7">
              Discover delicious pizzas from local vendors and enjoy every bite
              with PizzaHub.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link href="/" className="hover:text-white">
                Home
              </Link>

              <Link href="/menu" className="hover:text-white">
                Explore Menu
              </Link>

              <Link href="/sign-in" className="hover:text-white">
                Sign In
              </Link>

              <Link href="/sign-up" className="hover:text-white">
                Sign Up
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Contact</h3>
            <p className="text-sm">PizzaHub Support</p>
            <p className="mt-2 text-sm">Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs">
          © 2026 PizzaHub. All rights reserved.
        </div>
      </footer>
    </main>
  );
}