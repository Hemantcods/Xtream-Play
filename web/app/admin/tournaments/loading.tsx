import { Skeleton } from "@/components/ui/skeleton";

export default function TournamentsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-8 w-48 bg-white/10" />
          <Skeleton className="h-4 w-64 bg-white/10" />
        </div>
        <Skeleton className="h-10 w-40 rounded-xl bg-white/10" />
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#13192A]">
        <div className="space-y-2 p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
