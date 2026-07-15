"use client";

import { useState, useRef } from "react";
import { Info } from "lucide-react";

interface BarData {
  label: string;
  value: number;
  type: "striped" | "solid-dark" | "solid-light";
}

const BARS: BarData[] = [
  { label: "S", value: 35, type: "striped" },
  { label: "M", value: 70, type: "solid-dark" },
  { label: "T", value: 55, type: "solid-light" }, // Default highlighted in mockup (74% / 55%)
  { label: "W", value: 90, type: "solid-dark" },
  { label: "T", value: 45, type: "striped" },
  { label: "F", value: 60, type: "striped" },
  { label: "S", value: 30, type: "striped" },
];

export function AssetAnalytics() {
  // Default to index 2 (Tuesday) to match Donezo design layout initially
  const [activeIndex, setActiveIndex] = useState<number | null>(2);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    
    // Divide container width by number of bars
    const barWidth = rect.width / BARS.length;
    const hoveredIdx = Math.floor(relativeX / barWidth);
    
    // Clamp index between 0 and BARS.length - 1
    const clampedIdx = Math.max(0, Math.min(BARS.length - 1, hoveredIdx));
    setActiveIndex(clampedIdx);
  };

  const handleMouseLeave = () => {
    // Return to Tuesday (index 2) by default when mouse leaves
    setActiveIndex(2);
  };

  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm flex flex-col justify-between h-[280px] select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-0.5">
          <h3 className="text-[15px] font-bold text-[#0F1117]">Asset Analytics</h3>
          <p className="text-[12px] text-[#6B7280]">Weekly utilization performance</p>
        </div>
        <button type="button" className="text-[#9CA3AF] hover:text-[#4F46E5] transition-colors">
          <Info size={16} />
        </button>
      </div>



      {/* Chart container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 flex items-end justify-between px-2 pt-10 pb-2 cursor-crosshair"
      >
        {/* Render a vertical guide/pointer line behind the active bar */}
        {activeIndex !== null && (
          <div
            className="absolute top-2 bottom-8 w-[1px] border-l border-dashed border-[#059669]/30 transition-all duration-300 pointer-events-none"
            style={{
              left: `${((activeIndex + 0.5) / BARS.length) * 100}%`,
              transform: "translateX(-50%)",
            }}
          />
        )}

        {BARS.map((bar, idx) => {
          const isStriped = bar.type === "striped";
          const isLight = bar.type === "solid-light";
          const isActive = activeIndex === idx;

          // Use the exact value from the data
          const displayPct = bar.value;

          return (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 flex-1 relative transition-all duration-300"
              style={{
                opacity: activeIndex === null || isActive ? 1 : 0.45,
              }}
            >
              {/* Bar wrapper */}
              <div className="w-9 h-36 flex items-end relative justify-center">
                {/* Tooltip positioned smoothly above the bar */}
                {isActive && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#064E3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md animate-[page-in_0.15s_ease_both] z-10 whitespace-nowrap">
                    {displayPct}%
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#064E3B]" />
                  </div>
                )}

                {/* The Bar */}
                <div
                  className={`w-full rounded-full transition-all duration-300 ${
                    isActive ? "scale-x-[1.12] shadow-sm shadow-[#064E3B]/10" : ""
                  }`}
                  style={{
                    height: `${bar.value}%`,
                    transformOrigin: "bottom center",
                    background: isStriped
                      ? isActive
                        ? "repeating-linear-gradient(45deg, #059669, #059669 3px, transparent 3px, transparent 8px)"
                        : "repeating-linear-gradient(45deg, #CBD5E1, #CBD5E1 2px, transparent 2px, transparent 6px)"
                      : isLight
                      ? isActive
                        ? "#10B981"
                        : "#3CA079"
                      : isActive
                      ? "#059669"
                      : "#064E3B",
                  }}
                />
              </div>

              {/* Day label */}
              <span
                className={`text-[11px] font-bold transition-colors duration-200 ${
                  isActive ? "text-[#064E3B]" : "text-[#9CA3AF]"
                }`}
              >
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
