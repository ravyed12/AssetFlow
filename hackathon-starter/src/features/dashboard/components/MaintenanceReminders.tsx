"use client";

import { Calendar, PlayCircle } from "lucide-react";
import Link from "next/link";

export function MaintenanceReminders() {
  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-5 shadow-sm flex flex-col justify-between h-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-[#0F1117]">Reminders</h3>
        <Link href="/maintenance" className="text-[12px] font-bold text-[#3CA079] hover:underline">
          View all
        </Link>
      </div>

      {/* Reminder body */}
      <div className="flex-1 flex flex-col justify-center space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#064E3B]">
            <Calendar size={18} strokeWidth={2.5} />
          </div>
          <div className="space-y-1">
            <h4 className="text-[16px] font-bold text-[#0F1117] leading-snug">
              Server Migration &amp; Audit
            </h4>
            <p className="text-[13px] text-[#6B7280]">
              IT Department · Floor 3, Server Room B
            </p>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#064E3B] bg-emerald-50/50 px-2 py-0.5 rounded-md w-max mt-1">
              <span>Time: 02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Link
          href="/maintenance"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#064E3B] text-white hover:bg-[#043E2E] py-2.5 text-[13px] font-semibold transition-all shadow-md shadow-emerald-950/10 active:scale-[0.97]"
        >
          <PlayCircle size={16} strokeWidth={2.5} />
          <span>Start Maintenance</span>
        </Link>
      </div>
    </div>
  );
}
