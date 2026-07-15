import type { StatCard } from "../types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const TARGET_LINKS = [
  "/assets",        // Total Assets
  "/allocations",   // Active Allocations
  "/maintenance",   // Open Maintenance
  "/reports",       // Asset Value
];

export function StatsGrid({ stats }: { stats: StatCard[] }) {
  // Use the first 4 stats from stats array
  const displayStats = stats.slice(0, 4);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, idx) => {
        const isFirst = idx === 0;
        const targetHref = TARGET_LINKS[idx] || "/";

        return (
          <Link
            key={stat.label}
            href={targetHref}
            className={`group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 card-hover block ${
              isFirst
                ? "bg-[#064E3B] border-[#064E3B] text-white shadow-lg shadow-emerald-950/20 hover:bg-[#043E2E] hover:border-[#043E2E]"
                : "bg-white border-[#E5E7EB] text-[#0F1117] shadow-sm hover:border-[#064E3B] hover:bg-emerald-50/20"
            }`}
          >
            {/* Top Row: Label and Arrow */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[13px] font-semibold tracking-tight ${
                  isFirst ? "text-emerald-100" : "text-[#6B7280] group-hover:text-[#064E3B]"
                }`}
              >
                {stat.label}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                  isFirst
                    ? "bg-white/10 border-white/20 text-white group-hover:bg-white group-hover:text-[#064E3B] group-hover:border-white"
                    : "bg-white border-[#E5E7EB] text-[#0F1117] group-hover:bg-[#064E3B] group-hover:text-white group-hover:border-[#064E3B]"
                }`}
              >
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>

            {/* Middle Row: Value */}
            <div className="mb-4">
              <span
                className={`text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
                  isFirst ? "text-white" : "text-[#0F1117] group-hover:text-[#064E3B]"
                }`}
              >
                {stat.value}
              </span>
            </div>

            {/* Bottom Row: Delta and Trend indicator */}
            <div className="flex items-center gap-1.5">
              {isFirst ? (
                <div className="flex h-5 items-center rounded-full bg-white/15 px-2.5">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    {stat.delta}
                  </span>
                </div>
              ) : (
                <div className="flex h-5 items-center rounded-full bg-emerald-50 group-hover:bg-emerald-100 px-2.5 transition-colors duration-300">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {stat.delta}
                  </span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
