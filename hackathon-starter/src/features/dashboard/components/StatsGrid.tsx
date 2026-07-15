"use client";

import { useState } from "react";
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

  // Keep track of which card is currently hovered. Default to null.
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div 
      className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {displayStats.map((stat, idx) => {
        // If a card is hovered, only that hovered card is active. No card is active by default.
        const isActive = hoveredIdx === idx;
        const targetHref = TARGET_LINKS[idx] || "/";

        return (
          <Link
            key={stat.label}
            href={targetHref}
            onMouseEnter={() => setHoveredIdx(idx)}
            className={`group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 card-hover block ${
              isActive
                ? "bg-[#064E3B] border-[#064E3B] text-white shadow-lg shadow-emerald-950/20 scale-[1.01]"
                : "bg-white border-[#E5E7EB] text-[#0F1117] shadow-sm hover:border-[#E5E7EB]"
            }`}
          >
            {/* Top Row: Label and Arrow */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-[13px] font-semibold tracking-tight transition-colors duration-300 ${
                  isActive ? "text-emerald-100" : "text-[#6B7280]"
                }`}
              >
                {stat.label}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#064E3B] border-white"
                    : "bg-white border-[#E5E7EB] text-[#0F1117]"
                }`}
              >
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.5}
                  className={`transition-transform duration-300 ${
                    isActive ? "translate-x-0.5 -translate-y-0.5" : ""
                  }`}
                />
              </div>
            </div>

            {/* Middle Row: Value */}
            <div className="mb-4">
              <span
                className={`text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#0F1117]"
                }`}
              >
                {stat.value}
              </span>
            </div>

            {/* Bottom Row: Delta and Trend indicator */}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex h-5 items-center rounded-full px-2.5 transition-colors duration-300 ${
                  isActive ? "bg-white/15 text-white" : "bg-emerald-50 text-emerald-700"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {stat.delta}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
