import * as React from "react";

import { cn } from "@/lib/cn";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

function Footer({ children, className, ...props }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}

export { Footer };
