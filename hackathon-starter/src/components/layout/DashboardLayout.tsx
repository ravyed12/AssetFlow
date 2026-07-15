"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/cn";

export interface DashboardLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
  footer?: React.ReactNode;
  /** Optional custom navbar — defaults to <TopBar crumb=""> */
  navbar?: React.ReactNode;
  /** Optional custom sidebar — defaults to <Sidebar /> */
  sidebar?: React.ReactNode;
  /** Page title shown in the TopBar breadcrumb */
  crumb?: string;
}

function DashboardLayout({
  children,
  className,
  contentClassName,
  footer,
  navbar,
  sidebar,
  crumb = "",
  ...props
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const sidebarNode  = sidebar  ?? <Sidebar />;
  const navbarNode   = navbar   ?? <TopBar crumb={crumb} />;

  return (
    <div
      className={cn("flex h-screen bg-[#F7F8FA]", className)}
      {...props}
    >
      {sidebarNode}
      <div className="flex flex-1 flex-col overflow-hidden">
        {navbarNode}
        <main className={cn("flex-1 overflow-y-auto p-6", contentClassName)}>
          <div key={pathname} className="animate-page-in">
            {children}
          </div>
        </main>
        {footer}
      </div>
    </div>
  );
}

export { DashboardLayout };
