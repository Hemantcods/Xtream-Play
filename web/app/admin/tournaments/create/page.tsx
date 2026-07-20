"use client";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/admin/common/PageHeader";
import TournamentForm from "@/components/admin/forms/TournamentForm";
import { useCreateAdminTournamentMutation } from "@/store/api/adminApi";
import { CreateTournamentDto } from "@/types/admin";

export default function CreateTournamentPage() {
  const router = useRouter();
  const [createTournamnet,{isLoading}]=useCreateAdminTournamentMutation()
  const handleSubmit = async (data: CreateTournamentDto) => {
    const res = await createTournamnet(data).unwrap()
    console.log(res)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Tournament"
        description="Set up a new tournament"
      />

      <TournamentForm onSubmit={handleSubmit} loading={isLoading} />
    </div>
  );
}
