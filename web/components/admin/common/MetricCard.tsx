import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient?: boolean;
  loading?: boolean;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  loading,
  className,
}: MetricCardProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "animate-pulse rounded-2xl border border-white/10 bg-[#13192A] p-5",
          className,
        )}
      >
        <div className="mb-4 h-8 w-8 rounded-lg bg-white/10" />
        <div className="mb-1 h-4 w-24 rounded bg-white/10" />
        <div className="h-7 w-16 rounded bg-white/10" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#13192A] p-5 transition-all duration-200 hover:border-accent-brand/30 hover:shadow-xl hover:shadow-accent-brand/5",
        gradient &&
          "bg-gradient-to-br from-[#13192A] via-[#1a2338] to-[#13192A]",
        className,
      )}
    >
      {gradient && (
        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent-brand/5 blur-2xl" />
      )}
      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-brand/15">
        <Icon className="h-4 w-4 text-accent-brand" />
      </div>
      <p className="text-xs font-medium text-white/60">{title}</p>
      <p className="mt-1 text-2xl font-bold text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {subtitle && (
        <p className="mt-1 text-[11px] text-white/40">{subtitle}</p>
      )}
    </div>
  );
}
