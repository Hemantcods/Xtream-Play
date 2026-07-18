import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: number;
  trendUp?: boolean;
  loading?: boolean;
  className?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
  loading,
  className,
}: StatCardProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "animate-pulse rounded-2xl border border-white/10 bg-[#13192A] p-4",
          className,
        )}
      >
        <div className="mb-3 h-4 w-4 rounded bg-white/10" />
        <div className="mb-2 h-3 w-20 rounded bg-white/10" />
        <div className="h-6 w-16 rounded bg-white/10" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[#13192A] p-4 transition-all duration-200 hover:border-accent-brand/30 hover:shadow-xl hover:shadow-accent-brand/5",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <Icon className="h-4 w-4 text-accent-brand" />
        {trend !== undefined && (
          <span
            className={cn(
              "text-[11px] font-semibold",
              trendUp ? "text-green-400" : "text-red-400",
            )}
          >
            {trendUp ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-0.5 text-xl font-bold text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}
