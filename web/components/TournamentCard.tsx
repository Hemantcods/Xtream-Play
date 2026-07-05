import Link from "next/link";
import {
  CalendarDays,
  Gamepad2,
  Trophy,
  Users,
  ArrowRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Tournament {
  id: string;
  name: string;
  game: string;
  startDate: Date;
  prizePool: number;
  participantCount: number;
}

const MAX_PARTICIPANTS = 128;

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TournamentCard({
  tournament,
}: {
  tournament: Tournament;
}) {
  const progress =
    (tournament.participantCount / MAX_PARTICIPANTS) * 100;

  return (
    <Link href={`dashboard/tournament/${tournament.id}`}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#13192A] transition-all duration-200 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#1F2937] via-[#28354F] to-[#101726]" />

        <div className="space-y-4 p-5">
          {/* Title */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {tournament.name}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                {tournament.game}
              </span>

              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs text-green-400">
                Registration Open
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <Trophy className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-xs">Prize Pool</p>
                <p className="font-semibold text-white">
                  ${tournament.prizePool.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <Users className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs">Teams</p>
                <p className="font-semibold text-white">
                  {tournament.participantCount}/{MAX_PARTICIPANTS}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <Gamepad2 className="h-4 w-4 text-purple-400" />
              <div>
                <p className="text-xs">Game</p>
                <p className="font-semibold text-white">
                  {tournament.game}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <CalendarDays className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-xs">Starts</p>
                <p className="font-semibold text-white">
                  {formatDate(tournament.startDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/60">
              <span>Registration</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <Progress
              value={progress}
              indicatorClassName="bg-red-500"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm text-green-400">
              Registration Open
            </span>

            <ArrowRight className="h-5 w-5 text-white/60 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}