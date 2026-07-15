"use client";

import type { RecentAsset } from "../types";
import { Plus } from "lucide-react";

export function TeamCollaboration({ assets }: { assets: RecentAsset[] }) {
  // Filters out assets that have assignees
  const allocations = assets.filter((a) => a.assignee !== null);

  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm h-[320px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <h3 className="text-[15px] font-bold text-[#0F1117]">Allocations</h3>
          <p className="text-[12px] text-[#6B7280]">Active asset handovers</p>
        </div>
        <button
          type="button"
          onClick={() => (window.location.href = "/allocations")}
          className="flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] font-bold text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all"
        >
          <Plus size={11} strokeWidth={2.5} />
          Allocate
        </button>
      </div>

      {/* Member list */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-thin">
        {allocations.map((alloc) => (
          <div key={alloc.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar circle */}
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold text-white shadow-sm"
                style={{ background: alloc.avatarColor ?? "#4F46E5" }}
              >
                {alloc.initials}
              </div>
              {/* Member details */}
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#0F1117] leading-tight truncate">
                  {alloc.assignee}
                </p>
                <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5 leading-none truncate">
                  Assigned: {alloc.name}
                </p>
              </div>
            </div>

            {/* Status badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                alloc.status === "active"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "bg-amber-50 text-amber-700 border border-amber-100"
              }`}
            >
              {alloc.status === "active" ? "In Use" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
