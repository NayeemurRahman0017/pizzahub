"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="grid min-h-[60vh] place-items-center bg-orange-50 px-5">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
        <p className="mt-3 text-gray-500">An unexpected error occurred. Please try again.</p>
        <button onClick={reset} className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-red-700">Try again</button>
      </div>
    </main>
  );
}