"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bell, Search, Settings, LogOut, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

const COLORS = [
  "from-[#4F46E5] to-[#7C3AED]",
  "from-[#0EA5E9] to-[#2563EB]",
  "from-[#10B981] to-[#059669]",
  "from-[#F59E0B] to-[#D97706]",
];

export function TopBar({
  crumb,
  notificationCount = 0,
}: {
  crumb: string;
  notificationCount?: number;
}) {
  const router = useRouter();
  const [userName, setUserName] = useState("Admin");
  const [userRole, setUserRole] = useState("Administrator");
  const [dropOpen, setDropOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const colorClass = COLORS[userName.charCodeAt(0) % COLORS.length];

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", data.user.id)
        .single()
        .then(({ data: profile }) => {
          if (profile?.full_name) setUserName(profile.full_name);
          if (profile?.role) setUserRole(profile.role);
        });
    });
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const initials = getInitials(userName);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#EAECF0] bg-white/80 px-6 backdrop-blur-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        {crumb && (
          <>
            <span className="text-[13px] font-semibold text-[#0F1117]">{crumb}</span>
            <span className="h-4 w-px bg-[#E5E7EB]" />
          </>
        )}
        {/* Search */}
        <label className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 cursor-text transition-all hover:border-[#D1D5DB] focus-within:border-[#4F46E5] focus-within:bg-white focus-within:shadow-sm focus-within:ring-2 focus-within:ring-[#4F46E5]/12">
          <Search size={14} className="shrink-0 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search assets, people…"
            className="w-52 bg-transparent text-[13px] text-[#0F1117] placeholder:text-[#9CA3AF] focus:outline-none"
          />
          <kbd className="hidden rounded-md border border-[#E5E7EB] bg-white px-1.5 py-0.5 text-[10px] text-[#9CA3AF] shadow-sm sm:block">⌘K</kbd>
        </label>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Notification bell */}
        <Link
          href="/notifications"
          className="group relative flex h-8 w-8 items-center justify-center rounded-xl text-[#6B7280] transition-all hover:bg-[#F3F4F6] hover:text-[#0F1117]"
          title="Notifications"
        >
          <Bell size={17} strokeWidth={1.8} className="transition-transform group-hover:scale-110" />
          {notificationCount > 0 && (
            <>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75" />
            </>
          )}
        </Link>

        {/* User dropdown */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => setDropOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all hover:bg-[#F3F4F6] active:scale-[0.97]"
          >
            <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} text-[11px] font-bold text-white shadow-md shadow-indigo-500/25`}>
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[13px] font-semibold text-[#0F1117] leading-none">
                {userName.split(" ")[0]}
              </p>
            </div>
            <ChevronDown
              size={13}
              className={`text-[#9CA3AF] transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown panel */}
          {dropOpen && (
            <div className="animate-slide-down absolute right-0 top-[calc(100%+6px)] z-50 w-56 overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-xl shadow-black/10">
              {/* User info */}
              <div className="border-b border-[#F3F4F6] bg-gradient-to-br from-[#F8F9FF] to-white px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} text-[13px] font-bold text-white shadow shadow-indigo-500/25`}>
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold text-[#0F1117]">{userName}</p>
                    <p className="truncate text-[11px] capitalize text-[#6B7280]">{userRole?.toLowerCase()}</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-1.5">
                <Link
                  href="/settings"
                  onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#374151] transition-all hover:bg-[#F3F4F6] hover:text-[#0F1117]"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F3F4F6]">
                    <Settings size={13} strokeWidth={2} className="text-[#6B7280]" />
                  </div>
                  Profile Settings
                </Link>

                <div className="my-1 h-px bg-[#F3F4F6]" />

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-50">
                    <LogOut size={13} strokeWidth={2} className={loggingOut ? "animate-spin" : ""} />
                  </div>
                  {loggingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
