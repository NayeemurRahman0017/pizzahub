import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PizzaHub | Fresh Pizza, Delivered",
  description:
    "Discover delicious pizzas and order your favorites with PizzaHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <Toaster richColors position="top-right" />

        <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <Suspense
          fallback={
            <footer
              aria-hidden="true"
              className="min-h-105 bg-[#211916]"
            />
          }
        >
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}