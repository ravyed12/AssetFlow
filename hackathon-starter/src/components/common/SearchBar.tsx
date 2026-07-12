"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/cn";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export interface SearchBarProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  defaultValue?: string;
  inputClassName?: string;
  inputLabel?: string;
  onSearch?: (value: string) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  showSubmitButton?: boolean;
  submitLabel?: string;
  value?: string;
}

function SearchBar({
  className,
  defaultValue = "",
  inputClassName,
  inputLabel = "Search",
  onSearch,
  onValueChange,
  placeholder = "Search...",
  showSubmitButton = false,
  submitLabel = "Search",
  value,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  function setValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <form
      className={cn("flex w-full items-center gap-2", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch?.(currentValue);
      }}
      {...props}
    >
      <div className="relative flex-1">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
        />
        <Input
          aria-label={inputLabel}
          className={cn("pl-9 pr-10", inputClassName)}
          placeholder={placeholder}
          value={currentValue}
          onChange={(event) => setValue(event.target.value)}
        />
        {currentValue ? (
          <button
            aria-label="Clear search"
            className="absolute top-1/2 right-2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/10 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 dark:focus-visible:ring-white/10"
            type="button"
            onClick={() => setValue("")}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
      {showSubmitButton ? <Button type="submit">{submitLabel}</Button> : null}
    </form>
  );
}

export { SearchBar };
