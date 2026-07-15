"use client";

import { Info } from "lucide-react";

interface BarData {
  label: string;
  value: number;
  type: "striped" | "solid-dark" | "solid-light";
  tooltip?: string;
}

const BARS: BarData[] = [
  { label: "S", value: 35, type: "striped" },
  { label: "M", value: 70, type: "solid-dark" },
  { label: "T", value: 55, type: "solid-light", tooltip: "74%" },
  { label: "W", value: 90, type: "solid-dark" },
  { label: "T", value: 45, type: "striped" },
  { label: "F", value: 60, type: "striped" },
  { label: "S", value: 30, type: "striped" },
];

export function AssetAnalytics() {
  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm flex flex-col justify-between h-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <h3 className="text-[15px] font-bold text-[#0F1117]">Asset Analytics</h3>
          <p className="text-[12px] text-[#6B7280]">Weekly utilization performance</p>
        </div>
        <button type="button" className="text-[#9CA3AF] hover:text-[#4F46E5] transition-colors">
          <Info size={16} />
        </button>
      </div>

      {/* Chart container */}
      <div className="relative flex-1 flex items-end justify-between px-2 pt-6 pb-2">
        {/* Striped pattern SVG definition */}
        <svg className="absolute h-0 w-0">
          <defs>
            <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#CBD5E1" strokeWidth="2.5" />
            </pattern>
          </defs>
        </svg>

        {BARS.map((bar, idx) => {
          const isStriped = bar.type === "striped";
          const isLight = bar.type === "solid-light";

          return (
            <div key={idx} className="flex flex-col items-center gap-2.5 flex-1 relative group">
              {/* Bar */}
              <div className="w-9 h-36 flex items-end relative">
                {/* Background path or hover outline */}
                <div
                  className="w-full rounded-full transition-all duration-300"
                  style={{
                    height: `${bar.value}%`,
                    background: isStriped
                      ? "url(#diagonalHatch)"
                      : isLight
                      ? "#3CA079"
                      : "#064E3B",
                  }}
                />

                {/* Tooltip on Tuesday bar or hovered bar */}
                {bar.tooltip && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#064E3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md animate-bounce">
                    {bar.tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#064E3B]" />
                  </div>
                )}
              </div>

              {/* Day label */}
              <span className="text-[11px] font-bold text-[#9CA3AF]">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
