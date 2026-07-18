"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/common/PageHeader";
import TeamsTable from "@/components/admin/teams/TeamsTable";
import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import { mockTeams } from "@/mock/admin";

export default function TeamsPage() {
  const [loading] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<{
    id: string;
    type: "disqualify" | "delete";
  } | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teams"
        description="View and manage all registered teams"
      />

      <TeamsTable
        teams={mockTeams}
        loading={loading}
        onDisqualify={(id) => setConfirmTarget({ id, type: "disqualify" })}
        onDelete={(id) => setConfirmTarget({ id, type: "delete" })}
      />

      <ConfirmDialog
        open={!!confirmTarget}
        onConfirm={() => {
          console.log(`${confirmTarget?.type} team ${confirmTarget?.id}`);
          setConfirmTarget(null);
        }}
        onCancel={() => setConfirmTarget(null)}
        title={confirmTarget?.type === "disqualify" ? "Disqualify Team" : "Delete Team"}
        description={
          confirmTarget?.type === "disqualify"
            ? "Are you sure you want to disqualify this team?"
            : "Are you sure you want to delete this team? This cannot be undone."
        }
        confirmLabel={confirmTarget?.type === "disqualify" ? "Disqualify" : "Delete"}
        variant="destructive"
      />
    </div>
  );
}
