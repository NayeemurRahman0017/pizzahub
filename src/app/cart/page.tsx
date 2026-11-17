"use client";

import Link from "next/link";
import { useState } from "react";
import { Pizza, ShoppingCart, Trash2 } from "lucide-react";

const initialCart = [
  { id: 1, name: "Margherita Pizza", price: 450, quantity: 1 },
  { id: 2, name: "Pepperoni Pizza", price: 650, quantity: 2 },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-2xl font-bold text-orange-600"
        >
          <Pizza size={30} />
          PizzaHub
        </Link>

        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-900">
          <ShoppingCart />
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-xl text-gray-600">
              Your cart is empty!
            </p>
            <Link
              href="/menu"
              className="mt-5 inline-block rounded-lg bg-orange-600 px-6 py-3 text-white"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 border-b pb-5"
                >
                  <div>
                    <h2 className="font-bold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-orange-600">
                      ৳{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-orange-600">৳{total}</span>
            </div>

            <Link
              href="/login"
              className="mt-6 block rounded-lg bg-orange-600 py-3 text-center font-semibold text-white hover:bg-orange-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}

        <Link
          href="/menu"
          className="mt-6 inline-block text-orange-600 hover:underline"
        >
          ← Continue Shopping
        </Link>
      </div>
    </main>
  );
}