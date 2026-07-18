import { Skeleton } from "@/components/ui/skeleton";

export default function CreateTournamentLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <Skeleton className="h-8 w-48 bg-white/10" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[#13192A] p-6"
          >
            <Skeleton className="mb-4 h-4 w-32 bg-white/10" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-10 bg-white/5" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
