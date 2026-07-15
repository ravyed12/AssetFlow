import * as React from "react";
import { cn } from "@/lib/cn";

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  actions?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
}

function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-6 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1.5">
        {eyebrow && (
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-[#6B7280]">
            {eyebrow}
          </div>
        )}
        <h1 className="text-[22px] font-bold tracking-tight text-[#0F1117] leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] text-[#6B7280] leading-relaxed">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export { PageHeader };
