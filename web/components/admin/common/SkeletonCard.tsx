import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl border border-white/10 bg-[#13192A] p-4",
        className,
      )}
    >
      <div className="mb-3 h-4 w-4 rounded bg-white/10" />
      <div className="mb-2 h-3 w-20 rounded bg-white/10" />
      <div className="h-6 w-16 rounded bg-white/10" />
    </div>
  );
}
