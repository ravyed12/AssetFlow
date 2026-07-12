"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";

import { Button } from "./Button";

export interface DropdownItem {
  destructive?: boolean;
  disabled?: boolean;
  href?: string;
  label: React.ReactNode;
  onSelect?: () => void;
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  align?: "end" | "start";
  contentClassName?: string;
  items: ReadonlyArray<DropdownItem>;
  label: React.ReactNode;
  menuLabel?: string;
  triggerClassName?: string;
}

function Dropdown({
  align = "end",
  className,
  contentClassName,
  items,
  label,
  menuLabel = "Dropdown menu",
  triggerClassName,
  ...props
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>(
    [],
  );

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const firstEnabledItem = itemRefs.current.find(Boolean);
    firstEnabledItem?.focus();
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex", className)}
      {...props}
    >
      <Button
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn("justify-between gap-2", triggerClassName)}
        variant="outline"
        onClick={() => setOpen((current) => !current)}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </Button>
      {open ? (
        <div
          aria-label={menuLabel}
          className={cn(
            "absolute top-full z-50 mt-2 min-w-48 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950",
            align === "end" ? "right-0" : "left-0",
            contentClassName,
          )}
          role="menu"
        >
          {items.map((item, index) => {
            const itemClassName = cn(
              "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors outline-none focus-visible:bg-zinc-100 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:bg-zinc-900",
              item.destructive
                ? "text-red-600 dark:text-red-400"
                : "text-zinc-700 dark:text-zinc-200",
              !item.disabled && !item.destructive && "hover:bg-zinc-100 dark:hover:bg-zinc-900",
              !item.disabled &&
                item.destructive &&
                "hover:bg-red-50 dark:hover:bg-red-950/40",
            );

            if (item.href && !item.disabled) {
              return (
                <a
                  key={`${item.href}-${index}`}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={itemClassName}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={`${index}-${String(item.label)}`}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className={itemClassName}
                disabled={item.disabled}
                role="menuitem"
                type="button"
                onClick={() => {
                  if (item.disabled) {
                    return;
                  }

                  item.onSelect?.();
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export { Dropdown };
