"use client";

import Link from "next/link";
import { useState } from "react";
import { Pizza, ShoppingCart, Search } from "lucide-react";

const pizzas = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Classic",
    price: 450,
    description: "Cheese, tomato sauce and fresh basil.",
    emoji: "🍕",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Meat",
    price: 650,
    description: "Loaded with pepperoni and mozzarella.",
    emoji: "🍕",
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    category: "Chicken",
    price: 750,
    description: "Chicken, BBQ sauce and melted cheese.",
    emoji: "🍗",
  },
  {
    id: 4,
    name: "Vegetable Pizza",
    category: "Vegetarian",
    price: 500,
    description: "Fresh vegetables and delicious cheese.",
    emoji: "🥦",
  },
  {
    id: 5,
    name: "Cheese Lovers Pizza",
    category: "Classic",
    price: 600,
    description: "A delicious mix of different cheeses.",
    emoji: "🧀",
  },
  {
    id: 6,
    name: "Spicy Chicken Pizza",
    category: "Chicken",
    price: 700,
    description: "Spicy chicken with special sauce.",
    emoji: "🌶️",
  },
];

export default function MenuPage() {
  const [search, setSearch] = useState("");

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-orange-600"
          >
            <Pizza size={30} />
            PizzaHub
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            <ShoppingCart size={18} />
            Login
          </Link>
        </nav>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Delicious Menu
          </h1>
          <p className="mt-3 text-gray-600">
            Choose your favorite pizza and enjoy!
          </p>
        </div>

        <div className="mx-auto mb-10 flex max-w-lg items-center rounded-xl border bg-white px-4">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search your favorite pizza..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-3 py-3 outline-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-orange-100 text-8xl">
                {pizza.emoji}
              </div>

              <div className="p-5">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                  {pizza.category}
                </span>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {pizza.name}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {pizza.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">
                    ৳{pizza.price}
                  </span>

                  <Link
                    href="/login"
                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPizzas.length === 0 && (
          <p className="py-10 text-center text-gray-500">
            No pizza found!
          </p>
        )}
      </div>
    </main>
  );
}