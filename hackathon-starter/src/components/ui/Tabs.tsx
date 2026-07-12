"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export interface TabItem {
  content: React.ReactNode;
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  items: ReadonlyArray<TabItem>;
  listClassName?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  panelClassName?: string;
  value?: string;
}

function getFirstEnabledValue(items: ReadonlyArray<TabItem>) {
  return items.find((item) => !item.disabled)?.value ?? items[0]?.value ?? "";
}

function Tabs({
  className,
  defaultValue,
  items,
  listClassName,
  onValueChange,
  orientation = "horizontal",
  panelClassName,
  value,
  ...props
}: TabsProps) {
  const tabsId = React.useId();
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? value ?? getFirstEnabledValue(items),
  );

  React.useEffect(() => {
    if (value !== undefined) {
      return;
    }

    const hasSelectedItem = items.some(
      (item) => item.value === internalValue && !item.disabled,
    );

    if (!hasSelectedItem) {
      setInternalValue(getFirstEnabledValue(items));
    }
  }, [internalValue, items, value]);

  const selectedValue = value ?? internalValue;
  const activeItem =
    items.find((item) => item.value === selectedValue && !item.disabled) ??
    items.find((item) => !item.disabled);

  function setSelectedValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function focusButton(index: number) {
    buttonRefs.current[index]?.focus();
  }

  function getNextEnabledIndex(startIndex: number, step: number) {
    const total = items.length;

    for (let offset = 1; offset <= total; offset += 1) {
      const nextIndex = (startIndex + step * offset + total) % total;

      if (!items[nextIndex]?.disabled) {
        return nextIndex;
      }
    }

    return startIndex;
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div
        aria-orientation={orientation}
        className={cn(
          "inline-flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900",
          orientation === "vertical" && "flex-col",
          listClassName,
        )}
        role="tablist"
      >
        {items.map((item, index) => {
          const isActive = item.value === activeItem?.value;
          const tabId = `${tabsId}-${item.value}-tab`;
          const panelId = `${tabsId}-${item.value}-panel`;

          return (
            <button
              key={item.value}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              aria-controls={panelId}
              aria-selected={isActive}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/10 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:focus-visible:ring-white/10",
                isActive &&
                  "bg-white text-zinc-950 shadow-sm dark:bg-zinc-950 dark:text-zinc-50",
              )}
              disabled={item.disabled}
              id={tabId}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => setSelectedValue(item.value)}
              onKeyDown={(event) => {
                const previousKey =
                  orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
                const nextKey =
                  orientation === "vertical" ? "ArrowDown" : "ArrowRight";

                if (event.key === previousKey) {
                  event.preventDefault();
                  focusButton(getNextEnabledIndex(index, -1));
                }

                if (event.key === nextKey) {
                  event.preventDefault();
                  focusButton(getNextEnabledIndex(index, 1));
                }

                if (event.key === "Home") {
                  event.preventDefault();
                  focusButton(getNextEnabledIndex(items.length - 1, 1));
                }

                if (event.key === "End") {
                  event.preventDefault();
                  focusButton(getNextEnabledIndex(0, -1));
                }

                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedValue(item.value);
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem ? (
        <div
          aria-labelledby={`${tabsId}-${activeItem.value}-tab`}
          className={cn("outline-none", panelClassName)}
          id={`${tabsId}-${activeItem.value}-panel`}
          role="tabpanel"
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}

export { Tabs };
