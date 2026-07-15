"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Box,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  LayoutGrid,
  LogOut,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Dashboard",       href: "/",            icon: LayoutGrid },
  { label: "Asset Registry",  href: "/assets",      icon: Box },
  { label: "Allocations",     href: "/allocations", icon: ArrowLeftRight },
  { label: "Resource Booking",href: "/booking",     icon: CalendarClock },
  { label: "Maintenance",     href: "/maintenance", icon: Wrench },
  { label: "Audit",           href: "/audit",       icon: ClipboardCheck },
  { label: "People",          href: "/people",      icon: Users },
  { label: "Reports",         href: "/reports",     icon: BarChart3 },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Sidebar({ notificationCount = 0 }: { notificationCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("Admin User");
  const [userRole, setUserRole] = useState("Administrator");
  const [loggingOut, setLoggingOut] = useState(false);

  // Load real user data
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      // Try to get profile
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

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const initials = getInitials(userName);

  return (
    <aside className="flex h-screen w-[240px] flex-col bg-[#0B0D12] text-[#9CA3AF] relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#4F46E5]/5 via-transparent to-[#7C3AED]/5" />

      {/* Logo */}
      <div className="relative flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-indigo-500/30">
          <Box size={16} strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-white">AssetFlow</span>
        <div className="ml-auto flex h-5 items-center rounded-full bg-[#4F46E5]/20 px-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#818CF8]">Pro</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 space-y-0.5 overflow-y-auto px-3 pb-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all duration-150 ${
                active
                  ? "bg-[#1E2130] font-semibold text-white shadow-sm"
                  : "text-[#9CA3AF] hover:bg-[#15171D] hover:text-white"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.5 : 2}
                className={active ? "text-[#818CF8]" : "group-hover:text-[#818CF8] transition-colors"}
              />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
              )}
            </Link>
          );
        })}

        {/* Notifications */}
        <Link
          href="/notifications"
          className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all duration-150 ${
            pathname === "/notifications"
              ? "bg-[#1E2130] font-semibold text-white shadow-sm"
              : "text-[#9CA3AF] hover:bg-[#15171D] hover:text-white"
          }`}
        >
          <Bell
            size={16}
            strokeWidth={pathname === "/notifications" ? 2.5 : 2}
            className={pathname === "/notifications" ? "text-[#818CF8]" : "group-hover:text-[#818CF8] transition-colors"}
          />
          <span className="flex-1">Notifications</span>
          {notificationCount > 0 && (
            <span className="flex h-4 min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm shadow-red-500/30">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Bottom section */}
      <div className="relative border-t border-[#1A1C23] px-3 py-3 space-y-0.5">
        <Link
          href="/settings"
          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-all duration-150 ${
            pathname === "/settings"
              ? "bg-[#1E2130] text-white font-semibold"
              : "text-[#9CA3AF] hover:bg-[#15171D] hover:text-white"
          }`}
        >
          <Settings size={16} strokeWidth={2} />
          Settings
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#9CA3AF] transition-all duration-150 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        >
          <LogOut size={16} strokeWidth={2} className={loggingOut ? "animate-spin" : ""} />
          {loggingOut ? "Signing out..." : "Sign out"}
        </button>

        {/* User card */}
        <Link
          href="/settings"
          className="mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2.5 hover:bg-[#15171D] transition-all duration-150 group"
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-[11px] font-bold text-white shadow shadow-indigo-500/30">
            {initials}
          </div>
          <div className="flex-1 min-w-0 leading-tight">
            <p className="text-[13px] font-semibold text-white truncate">{userName}</p>
            <p className="text-[11px] text-[#6B7280] capitalize truncate">{userRole?.toLowerCase()}</p>
          </div>
          <ChevronRight size={13} className="text-[#4B5563] group-hover:text-[#6B7280] transition-colors" />
        </Link>
      </div>
    </aside>
  );
}
