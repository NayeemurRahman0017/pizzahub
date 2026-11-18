import Link from "next/link";
import { Pizza } from "lucide-react";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
        <Pizza size={26} />
      </span>
      <span className="text-2xl font-extrabold tracking-tight text-[#29201D]">
        Pizza<span className="text-primary">Hub</span>
      </span>
    </Link>
  );
}