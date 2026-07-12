import * as React from "react";

import { cn } from "@/lib/cn";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

function Sidebar({
  children,
  className,
  footer,
  header,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-full max-w-72 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
      {...props}
    >
      {header ? <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">{header}</div> : null}
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
      {footer ? <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">{footer}</div> : null}
    </aside>
  );
}

export { Sidebar };
