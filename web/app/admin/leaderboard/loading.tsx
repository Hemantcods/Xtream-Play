import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <Skeleton className="h-8 w-48 bg-white/10" />
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
