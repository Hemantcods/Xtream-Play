import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  title,
  action,
  children,
  className,
}: SectionCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#13192A] p-4 ${className ?? ""}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
