"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function TournamentDetailError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15">
        <AlertTriangle className="h-6 w-6 text-red-400" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-white">Failed to load tournament</h2>
        <p className="mt-1 text-sm text-white/50">{error.message}</p>
      </div>
      <button
        onClick={unstable_retry}
        className="rounded-xl bg-accent-brand px-4 py-2 text-sm font-medium text-white hover:bg-accent-brand/80 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
