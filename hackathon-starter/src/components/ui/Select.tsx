import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: ReadonlyArray<SelectOption>;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border border-zinc-200 bg-white px-3 py-2 pr-10 text-sm text-zinc-950 shadow-sm transition-colors outline-none focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-950/10 aria-invalid:border-red-500 aria-invalid:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:border-zinc-700 dark:focus-visible:ring-white/10 dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/10",
            className,
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled={props.required}>
              {placeholder}
            </option>
          ) : null}
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-500"
        />
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
