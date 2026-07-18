import { Skeleton } from "@/components/ui/skeleton";

export default function WalletLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <Skeleton className="h-8 w-48 bg-white/10" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
            <Skeleton className="mb-2 h-3 w-24 bg-white/10" />
            <Skeleton className="h-7 w-16 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
