"use client";

import { Clock, Gamepad2 } from "lucide-react";
import TournamentCountdown from "./TournamentCountdown";
import type { UpcomingMatch } from "@/types/tournament";

interface UpcomingMatchesCardProps {
  matches: UpcomingMatch[];
}

export default function UpcomingMatchesCard({
  matches,
}: UpcomingMatchesCardProps) {
  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <h3 className="mb-3 text-sm font-semibold text-white">
          Upcoming Matches
        </h3>
        <p className="text-xs text-white/40">No upcoming matches.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Upcoming Matches
      </h3>
      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-200 hover:border-red-500/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-start gap-3 ">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1F2937] to-[#28354F]">
                <Gamepad2 className="h-4 w-4 text-white/70" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {match.tournamentTitle}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/50">
                  <Clock className="h-3 w-3" />
                  <span>
                    {new Date(match.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TournamentCountdown targetDate={match.startDate} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
