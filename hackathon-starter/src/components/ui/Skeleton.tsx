import * as React from "react";

import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "circle" | "rect";
}

function Skeleton({
  className,
  shape = "rect",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-zinc-200 dark:bg-zinc-800",
        shape === "circle" ? "rounded-full" : "rounded-md",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
