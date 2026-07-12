import * as React from "react";

import { cn } from "@/lib/cn";

const containerSizes = {
  "2xl": "max-w-7xl",
  full: "max-w-none",
  lg: "max-w-5xl",
  md: "max-w-4xl",
  sm: "max-w-3xl",
  xl: "max-w-6xl",
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerSizes;
}

function Container({
  children,
  className,
  size = "xl",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", containerSizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };
