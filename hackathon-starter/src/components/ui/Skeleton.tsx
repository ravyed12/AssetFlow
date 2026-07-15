import { cn } from "@/lib/cn";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-[#F3F4F6] via-[#E9EAEC] to-[#F3F4F6]",
        "bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: "shimmer 1.6s ease-in-out infinite, pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        backgroundSize: "200% 100%",
      }}
      {...props}
    />
  );
}

export { Skeleton };
