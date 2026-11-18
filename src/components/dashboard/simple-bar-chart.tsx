export default function SimpleBarChart({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-6 flex h-48 items-end justify-around gap-3 border-b border-gray-200">
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-2">
            <span className="text-xs font-semibold text-gray-600">{d.value}</span>
            <div className="w-full max-w-12 rounded-t-lg bg-primary" style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-around gap-3 text-xs text-gray-500">
        {data.map((d) => <span key={d.label} className="flex-1 text-center">{d.label}</span>)}
      </div>
    </div>
  );
}