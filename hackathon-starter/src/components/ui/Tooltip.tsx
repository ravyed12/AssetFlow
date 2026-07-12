import * as React from "react";

import { cn } from "@/lib/cn";

const tooltipPositions = {
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "top-1/2 right-full mr-2 -translate-y-1/2",
  right: "top-1/2 left-full ml-2 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
} as const;

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  children: React.ReactNode;
  content: React.ReactNode;
  contentClassName?: string;
  side?: keyof typeof tooltipPositions;
}

function Tooltip({
  children,
  className,
  content,
  contentClassName,
  side = "top",
  ...props
}: TooltipProps) {
  const tooltipId = React.useId();

  let trigger = <span aria-describedby={tooltipId}>{children}</span>;

  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      "aria-describedby"?: string;
    }>;
    const existingDescription =
      typeof child.props["aria-describedby"] === "string"
        ? child.props["aria-describedby"]
        : undefined;

    trigger = React.cloneElement(child, {
      "aria-describedby": existingDescription
        ? `${existingDescription} ${tooltipId}`
        : tooltipId,
    });
  }

  return (
    <span
      className={cn("group/tooltip relative inline-flex", className)}
      {...props}
    >
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 w-max max-w-xs rounded-md bg-zinc-950 px-2 py-1 text-xs text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 dark:bg-zinc-100 dark:text-zinc-950",
          tooltipPositions[side],
          contentClassName,
        )}
      >
        {content}
      </span>
    </span>
  );
}

export { Tooltip };
