"use client";

import { useRouter } from "next/navigation";
import TournamentHeader from "./TournamentHeader";
import TournamentStatusBanner from "./TournamentStatusBanner";
import TournamentTeams from "./TournamentTeams";
import type { MyTournamentCard } from "@/types/tournament";

interface TournamentCardProps {
  tournament: MyTournamentCard;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/mytournaments/${tournament._id}/teams`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-6xl overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#13192A] transition-all duration-200 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 cursor-pointer"
    >
      <TournamentHeader
        title={tournament.name}
        game={tournament.game}
        mode={tournament.mode}
        status={tournament.status}
        bannerImage={tournament.bannerImage}
        startTime={tournament.startTime}
        entryFee={tournament.entryFee}
        teamType={tournament.mode.player}
        prizePool={tournament.prizePool}
      />

      <div className="hidden md:block border-t border-white/[0.06]" />

      <div className="space-y-4 px-0 md:space-y-3.5 md:px-5 md:py-4">
        <div onClick={(e) => e.stopPropagation()}>
          <TournamentStatusBanner
            status={tournament.status}
            startTime={tournament.startTime}
            registrationConfirmed={tournament.registrationConfirmed}
            room={tournament.room}
            round={tournament.round}
            currentMap={tournament.mode.map}
          />
        </div>

        {tournament.teams && tournament.teams.length > 0 && (
          <div className="px-4 md:px-0" onClick={(e) => e.stopPropagation()}>
            <TournamentTeams
              teams={tournament.teams}
              registeredTeams={tournament.registeredTeams}
              maxTeams={tournament.maxPlayers}
              tournamentId={tournament._id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
