
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  vendor: string;
  description: string;
  price: number;
  category: string;
  location: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    vendor: "Pizza Palace",
    description: "Classic pizza with tomato sauce, mozzarella and fresh basil.",
    price: 450,
    category: "Classic",
    location: "Dhanmondi",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    vendor: "Italian Pizza House",
    description: "Loaded with spicy pepperoni and melted mozzarella cheese.",
    price: 550,
    category: "Classic",
    location: "Gulshan",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    vendor: "Food Corner",
    description: "Smoky BBQ chicken with onion, cheese and special sauce.",
    price: 650,
    category: "Chicken",
    location: "Mirpur",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
  },
  {
    id: 4,
    name: "Vegetable Pizza",
    vendor: "Green Kitchen",
    description: "Fresh vegetables, mozzarella and delicious tomato sauce.",
    price: 400,
    category: "Vegetarian",
    location: "Dhanmondi",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
  },
  {
    id: 5,
    name: "Chicken Supreme",
    vendor: "Pizza Palace",
    description: "A delicious combination of chicken, peppers, onion and cheese.",
    price: 700,
    category: "Chicken",
    location: "Uttara",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  },
  {
    id: 6,
    name: "Four Cheese Pizza",
    vendor: "Italian Pizza House",
    description: "Rich and creamy pizza made with four different cheeses.",
    price: 750,
    category: "Cheese",
    location: "Gulshan",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800",
  },
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];
  const locations = [
    "All",
    "Dhanmondi",
    "Gulshan",
    "Mirpur",
    "Uttara",
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.vendor.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;
    const matchesLocation =
      location === "All" || item.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  }).sort((a, b) =>
    sort === "price-low" ? a.price - b.price :
    sort === "price-high" ? b.price - a.price :
    a.id - b.id
  );

  return (
    <main className="min-h-screen bg-orange-50">
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              PizzaHub Menu
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
              Find Your Perfect Pizza
            </h1>

            <p className="mt-4 text-gray-500">
              Browse delicious pizzas from our trusted vendors and find your
              next favorite meal.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pizza or vendor..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-primary"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 outline-none focus:border-primary"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Filter by location"
              className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 outline-none focus:border-primary"
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Locations" : item}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort menu items"
              className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 outline-none focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Pizzas
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredItems.length} pizza
              {filteredItems.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-primary">
                        {item.vendor}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-lg font-bold text-gray-900">
                      ৳{item.price}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-500">
                    Location: {item.location}, Dhaka
                  </p>

                  <Link
                    href={`/menu/${item.id}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                  >
                    <ShoppingBag size={17} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">
              No pizzas found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try a different search term or category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
