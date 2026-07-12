import { ChevronRight, Medal, Trophy, Users } from "lucide-react";
import Link from "next/link";
import type { TournamentTeam } from "@/types/tournament";

interface TournamentTeamsProps {
  teams: TournamentTeam[];
  registeredTeams: number;
  maxTeams: number;
  tournamentId: string;
}

const rankIcons = [
  <Trophy key="1" className="h-3 w-3 text-yellow-400" />,
  <Medal key="2" className="h-3 w-3 text-gray-300" />,
  <Medal key="3" className="h-3 w-3 text-amber-600" />,
];

export default function TournamentTeams({
  teams,
  registeredTeams,
  maxTeams,
  tournamentId,
}: TournamentTeamsProps) {
  return (
    <div>
      <div className="mb-2.5 md:mb-2.5 flex items-center gap-2">
        <Users className="h-3.5 w-3.5 text-white/50" />
        <span className="text-xs md:text-xs font-bold text-white">
          Registered Teams ({registeredTeams} / {maxTeams})
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1.5 custom-scrollbar">
        {teams.slice(0, 5).map((team, index) => (
          <div
            key={team.id}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 w-[115px] md:w-[130px] transition-all duration-200 hover:border-red-500/30 hover:bg-white/[0.06]"
          >
            <div className="flex h-8 w-8 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1F2937] to-[#28354F] text-[11px] font-bold text-white">
              {team.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                {index < 3 ? rankIcons[index] : <span className="text-[9px] text-white/40">#{team.rank}</span>}
                <span className="text-[11px] md:text-[11px] font-bold text-white">{team.rank}</span>
              </div>
              <p className="truncate text-[11px] md:text-[11px] font-semibold text-white leading-tight">{team.name}</p>
              <p className="text-[9px] md:text-[9px] font-medium text-white/50">{team.points} pts</p>
            </div>
          </div>
        ))}

        <Link
          href={`/my-tournaments/${tournamentId}/teams`}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-2 transition-all duration-200 hover:border-red-500/30 hover:bg-white/[0.05]"
        >
          <div className="flex flex-col items-center">
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            <span className="text-[9px] md:text-[9px] font-semibold text-white/40 whitespace-nowrap">View All</span>
          </div>
          <span className="text-[9px] md:text-[9px] font-medium text-white/30">{registeredTeams} Teams</span>
        </Link>
      </div>
    </div>
  );
}
