import * as React from "react";

import { cn } from "@/lib/cn";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  center?: React.ReactNode;
  end?: React.ReactNode;
  start?: React.ReactNode;
  sticky?: boolean;
}

function Navbar({
  center,
  className,
  end,
  start,
  sticky = false,
  ...props
}: NavbarProps) {
  return (
    <header
      className={cn(
        "border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95",
        sticky && "sticky top-0 z-40",
        className,
      )}
      {...props}
    >
      <div className="flex min-h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4">{start}</div>
        {center ? <div className="hidden shrink-0 md:flex">{center}</div> : null}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-4">{end}</div>
      </div>
    </header>
  );
}

export { Navbar };
