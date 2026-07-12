import * as React from "react";

import { cn } from "@/lib/cn";

export interface DashboardLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
  footer?: React.ReactNode;
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

function DashboardLayout({
  children,
  className,
  contentClassName,
  footer,
  navbar,
  sidebar,
  ...props
}: DashboardLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
        className,
      )}
      {...props}
    >
      {navbar}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className={cn("flex-1 p-4 sm:p-6 lg:p-8", contentClassName)}>
            {children}
          </main>
          {footer}
        </div>
      </div>
    </div>
  );
}

export { DashboardLayout };
