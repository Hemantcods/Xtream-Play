import { Skeleton } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <Skeleton className="h-8 w-48 bg-white/10" />
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-20">
        <div className="mx-auto h-12 w-12 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
