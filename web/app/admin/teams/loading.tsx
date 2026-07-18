import { Skeleton } from "@/components/ui/skeleton";

export default function TeamsLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <Skeleton className="h-8 w-48 bg-white/10" />
      <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
