import * as React from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/cn";

const spinnerSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: keyof typeof spinnerSizes;
}

function Spinner({
  className,
  label = "Loading",
  size = "md",
  ...props
}: SpinnerProps) {
  return (
    <span
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      {...props}
    >
      <LoaderCircle
        aria-hidden="true"
        className={cn("animate-spin text-current", spinnerSizes[size])}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner };
