import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 flex items-center text-[#9CA3AF]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "flex h-9 w-full rounded-xl border bg-white px-3 py-2 text-[13px] text-[#0F1117]",
              "placeholder:text-[#9CA3AF]",
              "shadow-sm",
              "transition-all duration-150",
              "focus:outline-none focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/15",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                : "border-[#E5E7EB]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 flex items-center text-[#9CA3AF]">
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xl border bg-white px-3 py-2 text-[13px] text-[#0F1117]",
          "placeholder:text-[#9CA3AF]",
          "shadow-sm",
          "transition-all duration-150",
          "focus:outline-none focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/15",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
            : "border-[#E5E7EB]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
