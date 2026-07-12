"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

const avatarSizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
} as const;

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  alt: string;
  fallback?: React.ReactNode;
  size?: keyof typeof avatarSizes;
  src?: string | null;
}

function Avatar({
  alt,
  className,
  fallback,
  size = "md",
  src,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = getInitials(alt) || "?";

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
        avatarSizes[size],
        className,
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          src={src}
          onError={() => setHasError(true)}
        />
      ) : (
        <span aria-hidden="true">{fallback ?? initials}</span>
      )}
    </div>
  );
}

export { Avatar };
