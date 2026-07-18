import type { LucideIcon } from "lucide-react";

interface InfoRowProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
}

export default function InfoRow({ label, value, icon: Icon }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 text-white/40" />}
        <span className="text-xs text-white/60">{label}</span>
      </div>
      <span className="text-sm font-semibold text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
    </div>
  );
}
