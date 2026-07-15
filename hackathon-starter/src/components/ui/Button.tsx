import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  // Base — all buttons get these
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
    "text-sm font-semibold select-none",
    "outline-none focus-visible:ring-3 focus-visible:ring-[#4F46E5]/30",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Spring press
    "active:scale-[0.97]",
    // Smooth transitions for everything
    "transition-all duration-150 ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — indigo gradient with glow
        default: [
          "bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white",
          "shadow-md shadow-indigo-500/25",
          "hover:brightness-110 hover:shadow-lg hover:shadow-indigo-500/35",
          "active:brightness-95",
        ].join(" "),

        // Secondary — soft grey
        secondary: [
          "bg-[#F3F4F6] text-[#1F2937]",
          "border border-[#E5E7EB]",
          "shadow-sm",
          "hover:bg-[#E9EAEC] hover:border-[#D1D5DB] hover:shadow",
        ].join(" "),

        // Outline — white card with border
        outline: [
          "border border-[#E5E7EB] bg-white text-[#374151]",
          "shadow-sm",
          "hover:bg-[#F9FAFB] hover:border-[#D1D5DB] hover:shadow",
        ].join(" "),

        // Ghost — minimal, no background
        ghost: [
          "text-[#374151] bg-transparent",
          "hover:bg-[#F3F4F6] hover:text-[#0F1117]",
        ].join(" "),

        // Destructive — red gradient
        destructive: [
          "bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white",
          "shadow-md shadow-red-500/20",
          "hover:brightness-110 hover:shadow-lg hover:shadow-red-500/30",
        ].join(" "),

        // Success — emerald
        success: [
          "bg-gradient-to-r from-[#059669] to-[#047857] text-white",
          "shadow-md shadow-emerald-500/20",
          "hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/30",
        ].join(" "),

        // Link
        link: "text-[#4F46E5] underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        xs:   "h-7  px-2.5 text-xs  rounded-lg gap-1.5",
        sm:   "h-8  px-3   text-xs  rounded-lg",
        md:   "h-9  px-4   text-sm",
        lg:   "h-10 px-5   text-sm",
        xl:   "h-11 px-6   text-base",
        icon: "h-9  w-9",
        "icon-sm": "h-7 w-7 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, type, variant, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading && (
          <svg
            className="h-3.5 w-3.5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
