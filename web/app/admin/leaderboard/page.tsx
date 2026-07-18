"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/common/PageHeader";
import LeaderboardEditor from "@/components/admin/leaderboard/LeaderboardEditor";
import { mockLeaderboard } from "@/mock/admin";

export default function LeaderboardPage() {
  const [loading] = useState(false);

  const handleSave = (entries: Partial<{ teamId: string; kills: number; placement: number; points: number; prize: number }>[]) => {
    console.log("Save leaderboard changes:", entries);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leaderboard"
        description="Edit and manage tournament leaderboard rankings"
      />

      <LeaderboardEditor
        entries={mockLeaderboard}
        loading={loading}
        onSave={handleSave}
      />
    </div>
  );
}
