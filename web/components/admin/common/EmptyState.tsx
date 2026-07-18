import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
        <Icon className="h-6 w-6 text-white/30" />
      </div>
      <p className="text-base font-semibold text-white/60">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-white/40">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
