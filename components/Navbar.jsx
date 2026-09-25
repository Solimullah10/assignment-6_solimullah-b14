"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedPlan } = usePlan();

  return (
    <nav className="bg-[#0b0c0e] text-white px-6 py-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 z-50">
      <Link
        href="/"
        className="text-xl font-black tracking-wider flex items-center gap-2"
      >
        <span>
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </span>{" "}
        FITLOG
      </Link>

      <div className="flex gap-6 font-semibold uppercase text-xs">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-[#ccff00] underline underline-offset-4"
              : "text-zinc-400 hover:text-white"
          }
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan"
              ? "text-[#ccff00] underline underline-offset-4"
              : "text-zinc-400 hover:text-white"
          }
        >
          My Plan
        </Link>
      </div>

      <Link href="/my-plan" className="flex items-center gap-3">
        <span className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full">
          Plan {todayPlan.length}
        </span>
        <span className="border border-zinc-700 text-zinc-300 text-xs font-bold px-3 py-1 rounded-full hover:border-white">
          Saved {savedPlan.length}
        </span>
      </Link>
    </nav>
  );
}
