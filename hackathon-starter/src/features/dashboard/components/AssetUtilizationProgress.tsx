"use client";

export function AssetUtilizationProgress() {
  const percentage = 80;
  // Arc math for semi-circle gauge
  const radius = 50;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // 157.08
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm h-[320px] flex flex-col justify-between">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[15px] font-bold text-[#0F1117]">Asset Utilization</h3>
        <p className="text-[12px] text-[#6B7280]">Overall active workspace</p>
      </div>

      {/* SVG Arc Gauge */}
      <div className="relative flex flex-col items-center justify-center flex-1">
        {/* Striped patterns for remaining segment */}
        <svg className="absolute h-0 w-0">
          <defs>
            <pattern id="gaugeHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#E2E8F0" strokeWidth="2" />
            </pattern>
          </defs>
        </svg>

        <svg viewBox="0 0 120 70" className="w-[180px] overflow-visible">
          {/* Base striped track */}
          <path
            d="M 10,60 A 50,50 0 0,1 110,60"
            fill="none"
            stroke="url(#gaugeHatch)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress track */}
          <path
            d="M 10,60 A 50,50 0 0,1 110,60"
            fill="none"
            stroke="#064E3B"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute top-[48%] flex flex-col items-center">
          <span className="text-3xl font-extrabold text-[#0F1117] tracking-tight">{percentage}%</span>
          <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mt-0.5">
            Active Pool
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 border-t border-[#F3F4F6] pt-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6B7280]">
          <span className="h-2 w-2 rounded-full bg-[#064E3B]" />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6B7280]">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span>Available</span>
        </div>
      </div>
    </div>
  );
}
