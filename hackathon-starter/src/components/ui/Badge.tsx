import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-all duration-150 select-none",
  {
    variants: {
      variant: {
        default:   "bg-[#EEF2FF] text-[#4F46E5]",
        secondary: "bg-[#F3F4F6] text-[#374151]",
        success:   "bg-[#DCFCE7] text-[#15803D]",
        warning:   "bg-[#FEF9C3] text-[#A16207]",
        danger:    "bg-[#FEE2E2] text-[#DC2626]",
        info:      "bg-[#E0F2FE] text-[#0369A1]",
        violet:    "bg-[#F5F3FF] text-[#7C3AED]",
        orange:    "bg-[#FFF7ED] text-[#C2410C]",
        // Status specific
        available:    "bg-[#DCFCE7] text-[#15803D]",
        allocated:    "bg-[#EEF2FF] text-[#4F46E5]",
        maintenance:  "bg-[#FEF9C3] text-[#A16207]",
        retired:      "bg-[#F3F4F6] text-[#6B7280]",
        pending:      "bg-[#FFF7ED] text-[#C2410C]",
        active:       "bg-[#DCFCE7] text-[#15803D]",
        inactive:     "bg-[#F3F4F6] text-[#6B7280]",
        // Priority
        high:     "bg-[#FEE2E2] text-[#DC2626]",
        medium:   "bg-[#FEF9C3] text-[#A16207]",
        low:      "bg-[#DCFCE7] text-[#15803D]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" || variant === "available" || variant === "active" || variant === "low"
              ? "bg-[#16A34A]"
              : variant === "danger" || variant === "high"
              ? "bg-[#DC2626]"
              : variant === "warning" || variant === "maintenance" || variant === "pending" || variant === "medium"
              ? "bg-[#CA8A04]"
              : "bg-[#6B7280]"
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
