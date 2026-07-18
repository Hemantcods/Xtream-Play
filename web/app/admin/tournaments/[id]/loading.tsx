import { Skeleton } from "@/components/ui/skeleton";

export default function TournamentDetailLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <Skeleton className="h-8 w-48 bg-white/10" />
      <div className="rounded-2xl border border-white/10 bg-[#13192A] overflow-hidden">
        <Skeleton className="h-32 w-full bg-white/5" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-64 bg-white/10" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
