import Link from "next/link";
import { ArrowLeft, Pizza } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-orange-50 px-5 py-16">
      <div className="max-w-lg text-center">
        <Pizza className="mx-auto text-primary" size={64} />
        <p className="mt-5 text-sm font-bold uppercase tracking-widest text-primary">Error 404</p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">This slice went missing</h1>
        <p className="mt-4 text-gray-500">The page you requested does not exist or may have moved.</p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
