import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { TournamentSummary } from "@/types/tournament";
import { cn } from "@/lib/utils";

interface TournamentSummaryCardProps {
  summary: TournamentSummary;
}

const statusConfig = {
  upcoming: { label: "Registration Open", className: "text-green-400 bg-green-500/15" },
  live: { label: "Live Now", className: "text-red-400 bg-red-500/15" },
  completed: { label: "Completed", className: "text-yellow-400 bg-yellow-500/15" },
};

export default function TournamentSummaryCard({ summary }: TournamentSummaryCardProps) {
  const config = statusConfig[summary.status];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] overflow-hidden">
      <div className="h-28 bg-gradient-to-br from-[#1F2937] via-[#28354F] to-[#101726]" />
      <div className="p-4">
        <h3 className="text-base font-bold text-white">{summary.title}</h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80">{summary.game}</span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/80">{summary.mode}</span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium", config.className)}>
            {config.label}
          </span>
        </div>

        <Link href={`/dashboard/tournament/${summary.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            View Tournament Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
