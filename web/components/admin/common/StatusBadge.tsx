import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "outline";
  className?: string;
}

const statusStyles: Record<string, string> = {
  upcoming: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  running: "text-green-400 bg-green-500/15 border-green-500/30",
  live: "text-green-400 bg-green-500/15 border-green-500/30",
  completed: "text-blue-400 bg-blue-500/15 border-blue-500/30",
  cancelled: "text-white/40 bg-white/5 border-white/10",
  confirmed: "text-green-400 bg-green-500/15 border-green-500/30",
  pending: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  disqualified: "text-red-400 bg-red-500/15 border-red-500/30",
  failed: "text-red-400 bg-red-500/15 border-red-500/30",
  active: "text-green-400 bg-green-500/15 border-green-500/30",
  paid: "text-green-400 bg-green-500/15 border-green-500/30",
  refund: "text-blue-400 bg-blue-500/15 border-blue-500/30",
  payout: "text-purple-400 bg-purple-500/15 border-purple-500/30",
  registration: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
};

export default function StatusBadge({
  status,
  variant = "default",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        statusStyles[status.toLowerCase()] ||
          "text-white/60 bg-white/5 border-white/10",
        variant === "outline" && "bg-transparent",
        className,
      )}
    >
      {status}
    </span>
  );
}
