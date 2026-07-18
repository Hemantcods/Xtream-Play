import { ArrowRight } from "lucide-react";
import SectionCard from "@/components/admin/common/SectionCard";
import StatusBadge from "@/components/admin/common/StatusBadge";
import type { AdminTournament } from "@/types/admin";
import { formatDateTime } from "@/lib/utils";

interface LatestTournamentsProps {
  tournaments: AdminTournament[];
  loading?: boolean;
}

export default function LatestTournaments({
  tournaments,
  loading,
}: LatestTournamentsProps) {
  const display = tournaments.slice(0, 5);

  return (
    <SectionCard title="Latest Tournaments">
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-lg bg-white/5"
            />
          ))}
        </div>
      ) : display.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">
          No tournaments yet
        </p>
      ) : (
        <div className="space-y-2">
          {display.map((t) => (
            <div
              key={t._id}
              className="flex items-center justify-between rounded-lg p-2 transition-all hover:bg-white/[0.02]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {t.name}
                </p>
                <p className="text-[11px] text-white/40">
                  {t.game} · {t.mode.player} · {t.registeredPlayers}/{t.maxPlayers} players
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="hidden sm:inline text-xs text-white/40">
                  {formatDateTime(t.StartTime)}
                </span>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && display.length > 0 && (
        <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs text-white/40 hover:text-white/70 transition-all">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </SectionCard>
  );
}
