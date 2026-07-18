"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/admin/common/PageHeader";
import TournamentForm from "@/components/admin/forms/TournamentForm";
import type { TournamentFormData } from "@/components/admin/forms/TournamentForm";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: TournamentFormData) => {
    setLoading(true);
    console.log("Create tournament:", data);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/tournaments");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Tournament"
        description="Set up a new tournament"
      />

      <TournamentForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
