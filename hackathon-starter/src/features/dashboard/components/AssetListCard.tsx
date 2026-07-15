"use client";

import type { RecentAsset } from "../types";
import { Laptop, Car, Award, Layers, Server, Plus } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Laptop: Laptop,
  Vehicle: Car,
  Furniture: Award,
  Server: Server,
};

const COLOR_MAP: Record<string, string> = {
  Laptop: "text-blue-600 bg-blue-50 border-blue-100",
  Vehicle: "text-amber-600 bg-amber-50 border-amber-100",
  Furniture: "text-emerald-600 bg-emerald-50 border-emerald-100",
  Server: "text-purple-600 bg-purple-50 border-purple-100",
};

export function AssetListCard({ assets }: { assets: RecentAsset[] }) {
  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm h-[280px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-bold text-[#0F1117]">Asset List</h3>
        <button
          type="button"
          onClick={() => (window.location.href = "/assets")}
          className="flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] font-bold text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all"
        >
          <Plus size={11} strokeWidth={2.5} />
          New
        </button>
      </div>

      {/* Asset items */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
        {assets.map((asset) => {
          const Icon = ICON_MAP[asset.category] || Layers;
          const colorCls = COLOR_MAP[asset.category] || "text-gray-600 bg-gray-50 border-gray-100";

          return (
            <div key={asset.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                {/* Icon box */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${colorCls}`}>
                  <Icon size={16} strokeWidth={2} />
                </div>
                {/* Name & ID */}
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#0F1117] leading-tight truncate group-hover:text-[#4F46E5] transition-colors">
                    {asset.name}
                  </p>
                  <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5 leading-none">
                    {asset.id} · {asset.category}
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wide ${
                  asset.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : asset.status === "available"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {asset.statusLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
