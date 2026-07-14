"use client";

import { Users, Clock, Timer, BadgeCheck } from "lucide-react";
import TournamentCountdown from "@/components/my-tournaments/TournamentCountdown";
import type { TournamentSummary } from "@/types/tournament";

interface TeamsStatsProps {
  summary: TournamentSummary;
}

export default function TeamsStats({ summary }: TeamsStatsProps) {
  const spotsLeft = summary.maxPlayers - summary.registeredPlayers;
  const progress = (summary.registeredPlayers / summary.maxPlayers) * 100;

  const statusBadge = {
    upcoming: { label: "Registration Open", className: "text-green-400 bg-green-500/15 border-green-500/30" },
    live: { label: "Live Now", className: "text-red-400 bg-red-500/15 border-red-500/30" },
    completed: { label: "Completed", className: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30" },
  }[summary.status];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="flex items-center gap-2 text-white/50">
          <Users className="h-4 w-4" />
          <span className="text-xs font-medium">Registered Players</span>
        </div>
        <p className="mt-1.5 text-xl font-bold text-white">
          {summary.registeredPlayers} <span className="text-sm font-normal text-white/40">/ {summary.maxPlayers}</span>
        </p>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="flex items-center gap-2 text-white/50">
          <Timer className="h-4 w-4 text-yellow-400" />
          <span className="text-xs font-medium">Spots Left</span>
        </div>
        <p className="mt-1.5 text-xl font-bold text-yellow-400">{spotsLeft}</p>
        <p className="mt-0.5 text-xs text-white/40">Available</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="flex items-center gap-2 text-white/50">
          <Clock className="h-4 w-4" />
          <span className="text-xs font-medium">Registration Ends In</span>
        </div>
        <div className="mt-1.5">
          <TournamentCountdown targetDate={summary.registrationEndsAt} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="flex items-center gap-2 text-white/50">
          <BadgeCheck className="h-4 w-4" />
          <span className="text-xs font-medium">Tournament Status</span>
        </div>
        <p className="mt-1.5 text-xl font-bold text-white">{summary.status === "upcoming" ? "Registration Open" : summary.status === "live" ? "Live Now" : "Completed"}</p>
        <span className={`mt-1.5 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusBadge.className}`}>
          {statusBadge.label}
        </span>
      </div>
    </div>
  );
}
