import { ChevronRight } from "lucide-react";
import type { RegisteredTeam } from "@/types/tournament";
import { cn } from "@/lib/utils";

interface MobileTeamsListProps {
  teams: RegisteredTeam[];
}

const statusStyles: Record<string, string> = {
  confirmed: "text-green-400 bg-green-500/15 border-green-500/30",
  pending: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  qualified: "text-blue-400 bg-blue-500/15 border-blue-500/30",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MobileTeamsList({ teams }: MobileTeamsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#13192A] px-4 py-3.5 transition-all duration-200 hover:border-red-500/30"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-white/40">
            {index + 1}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{team.teamName}</p>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider shrink-0 ml-2",
                  statusStyles[team.status],
                )}
              >
                {team.status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
              <span className="font-medium text-white/70">{team.totalPoints} pts</span>
              <span>Registered {formatDate(team.registeredAt)}</span>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
        </div>
      ))}
    </div>
  );
}
