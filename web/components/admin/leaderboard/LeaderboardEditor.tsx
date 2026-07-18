"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { LeaderboardEntry } from "@/types/admin";

interface LeaderboardEditorProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
  onSave?: (entries: Partial<LeaderboardEntry>[]) => void;
}

export default function LeaderboardEditor({
  entries,
  loading,
  onSave,
}: LeaderboardEditorProps) {
  const [edits, setEdits] = useState<Record<string, Partial<LeaderboardEntry>>>(
    {},
  );

  const updateEntry = (
    id: string,
    field: keyof LeaderboardEntry,
    value: string,
  ) => {
    const num = parseInt(value, 10);
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: isNaN(num) ? value : num },
    }));
  };

  const getValue = (entry: LeaderboardEntry, field: keyof LeaderboardEntry) => {
    return edits[entry.teamId]?.[field] ?? entry[field];
  };

  const hasEdits = Object.keys(edits).length > 0;

  const handleSave = () => {
    const changes = Object.entries(edits).map(([teamId, data]) => ({
      teamId,
      ...data,
    }));
    onSave?.(changes);
    setEdits({});
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#13192A]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
              <th className="w-12 px-3 py-3">Rank</th>
              <th className="px-3 py-3">Team</th>
              <th className="px-3 py-3 text-right">Kills</th>
              <th className="px-3 py-3 text-right">Placement</th>
              <th className="px-3 py-3 text-right">Points</th>
              <th className="px-3 py-3 text-right">Prize (₹)</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-3 py-3.5">
                        <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
                      </td>
                    ))}
                  </tr>
                ))
              : entries.map((entry) => (
                  <tr
                    key={entry.teamId}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-3 py-3.5">
                      <span className="font-bold text-white/60">
                        #{entry.rank}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 font-semibold text-white">
                      {entry.teamName}
                    </td>
                    {(["kills", "placement", "points", "prize"] as const).map(
                      (field) => (
                        <td key={field} className="px-3 py-3.5 text-right">
                          <input
                            type="number"
                            value={getValue(entry, field)}
                            onChange={(e) =>
                              updateEntry(entry.teamId, field, e.target.value)
                            }
                            className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-right text-sm text-white focus:border-accent-brand/40 focus:outline-none focus:ring-1 focus:ring-accent-brand/20 transition-all"
                          />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {hasEdits && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-accent-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-brand/80 transition-all"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-white/40">
          <p className="text-base">No leaderboard data</p>
        </div>
      )}
    </div>
  );
}
