import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-8 w-48 bg-white/10" />
          <Skeleton className="h-4 w-64 bg-white/10" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[#13192A] p-4"
          >
            <Skeleton className="mb-3 h-4 w-4 rounded bg-white/10" />
            <Skeleton className="mb-2 h-3 w-20 bg-white/10" />
            <Skeleton className="h-6 w-16 bg-white/10" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <Skeleton className="mb-4 h-4 w-32 bg-white/10" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
