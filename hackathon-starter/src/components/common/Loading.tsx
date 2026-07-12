import * as React from "react";

import { cn } from "@/lib/cn";

import { Spinner } from "../ui/Spinner";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  fullHeight?: boolean;
  label?: string;
  message?: React.ReactNode;
  size?: "lg" | "md" | "sm";
}

function Loading({
  className,
  fullHeight = false,
  label = "Loading",
  message = "Loading...",
  size = "md",
  ...props
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400",
        fullHeight && "min-h-[12rem]",
        className,
      )}
      {...props}
    >
      <Spinner label={label} size={size} />
      {message ? <span>{message}</span> : null}
    </div>
  );
}

export { Loading };
