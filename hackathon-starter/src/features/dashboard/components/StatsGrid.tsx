import type { StatCard } from "../types";
import { ArrowUpRight } from "lucide-react";

export function StatsGrid({ stats }: { stats: StatCard[] }) {
  // Use the first 4 stats from stats array
  const displayStats = stats.slice(0, 4);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, idx) => {
        const isFirst = idx === 0;

        return (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 card-hover ${
              isFirst
                ? "bg-[#064E3B] border-[#064E3B] text-white shadow-lg shadow-emerald-950/20"
                : "bg-white border-[#E5E7EB] text-[#0F1117] shadow-sm"
            }`}
          >
            {/* Top Row: Label and Arrow */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[13px] font-semibold tracking-tight ${
                  isFirst ? "text-emerald-100" : "text-[#6B7280]"
                }`}
              >
                {stat.label}
              </span>
              <button
                type="button"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                  isFirst
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-white border-[#E5E7EB] text-[#0F1117] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
                }`}
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
            </div>

            {/* Middle Row: Value */}
            <div className="mb-4">
              <span
                className={`text-4xl font-extrabold tracking-tight ${
                  isFirst ? "text-white" : "text-[#0F1117]"
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
                <div className="flex h-5 items-center rounded-full bg-emerald-50 px-2.5">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {stat.delta}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
