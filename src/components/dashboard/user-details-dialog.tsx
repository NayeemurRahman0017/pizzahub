"use client";

type U = { id: number; name: string; email: string; role: string; isBlocked: boolean };

export default function UserDetailsDialog({ user, onClose }: { user: U | null; onClose: () => void }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd>{user.email}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Role</dt><dd>{user.role}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Status</dt><dd>{user.isBlocked ? "Blocked" : "Active"}</dd></div>
        </dl>
        <button onClick={onClose} className="mt-6 w-full rounded-lg bg-primary py-2.5 font-semibold text-white">Close</button>
      </div>
    </div>
  );
}