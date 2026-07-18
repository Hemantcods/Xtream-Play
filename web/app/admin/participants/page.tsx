"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/common/PageHeader";
import ParticipantsTable from "@/components/admin/participants/ParticipantsTable";
import { mockParticipants } from "@/mock/admin";

export default function ParticipantsPage() {
  const [loading] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Participants"
        description="View and manage all tournament participants"
      />

      <ParticipantsTable participants={mockParticipants} loading={loading} />
    </div>
  );
}
