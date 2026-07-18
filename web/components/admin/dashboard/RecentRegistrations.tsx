import { ArrowRight } from "lucide-react";
import SectionCard from "@/components/admin/common/SectionCard";
import StatusBadge from "@/components/admin/common/StatusBadge";
import type { AdminRegistration } from "@/types/admin";
import { formatDateTime } from "@/lib/utils";

interface RecentRegistrationsProps {
  registrations: AdminRegistration[];
  loading?: boolean;
}

export default function RecentRegistrations({
  registrations,
  loading,
}: RecentRegistrationsProps) {
  const display = registrations.slice(0, 5);

  return (
    <SectionCard title="Recent Registrations">
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-white/5"
            />
          ))}
        </div>
      ) : display.length === 0 ? (
        <p className="py-6 text-center text-sm text-white/40">
          No recent registrations
        </p>
      ) : (
        <div className="space-y-2">
          {display.map((reg) => (
            <div
              key={reg._id}
              className="flex items-center justify-between rounded-lg p-2 transition-all hover:bg-white/[0.02]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {reg.inGameName}
                </p>
                <p className="text-[11px] text-white/40 truncate">
                  {reg.userName} · {reg.tournamentName}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="text-xs text-white/60">
                  {formatDateTime(reg.joinedAt)}
                </span>
                <StatusBadge status={reg.status} />
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
