"use client";

import type { DashboardOrg } from "../types";
import { Plus, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  org: DashboardOrg;
  onSync?: () => void;
  onRegisterAsset?: () => void;
}

export function DashboardHeader({ org, onSync, onRegisterAsset }: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Title block */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-bold tracking-tight text-[#0F1117] leading-tight">
          Dashboard
        </h1>
        <p className="text-[13px] text-[#6B7280] leading-relaxed">
          Manage, track, and optimize your organisation&apos;s assets with ease.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex shrink-0 items-center gap-2.5">
        <Button
          onClick={onRegisterAsset}
          className="bg-[#064E3B] text-white hover:bg-[#043E2E] shadow-md shadow-emerald-950/15 gap-1.5 px-4 h-10 rounded-xl active:scale-[0.97]"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Asset</span>
        </Button>
        <Button
          onClick={onSync}
          variant="outline"
          className="border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB] gap-1.5 px-4 h-10 rounded-xl active:scale-[0.97]"
        >
          <UploadCloud size={16} strokeWidth={2} />
          <span>Import Data</span>
        </Button>
      </div>
    </div>
  );
}
