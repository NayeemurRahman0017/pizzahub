export default function Loading() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-orange-50">
      <div className="flex items-center gap-3 text-gray-600">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-primary" />
        <span className="font-semibold">Loading PizzaHub...</span>
      </div>
    </main>
  );
}
