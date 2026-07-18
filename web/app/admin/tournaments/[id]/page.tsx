"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/admin/common/PageHeader";
import TournamentDetailHeader from "@/components/admin/tournaments/TournamentDetailHeader";
import TournamentTabs from "@/components/admin/tournaments/TournamentTabs";
import ParticipantsTable from "@/components/admin/participants/ParticipantsTable";
import TeamsTable from "@/components/admin/teams/TeamsTable";
import LeaderboardEditor from "@/components/admin/leaderboard/LeaderboardEditor";
import SectionCard from "@/components/admin/common/SectionCard";
import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import { useDeleteAdminTournamentMutation, useGetAdminTournamentQuery } from "@/store/api/adminApi";
import { mockParticipants, mockTeams, mockLeaderboard } from "@/mock/admin";
import { toast } from "sonner";
export default function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useGetAdminTournamentQuery(id)
  const [deleteTournament] =useDeleteAdminTournamentMutation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const tournament = data?.data

  if (!tournament) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/60">
        <p className="text-lg">Tournament not found</p>
        <button
          onClick={() => router.push("/admin/tournaments")}
          className="mt-4 rounded-xl bg-accent-brand px-4 py-2 text-sm text-white"
        >
          Back to Tournaments
        </button>
      </div>
    );
  }
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "participants", label: "Participants", count: tournament.registeredPlayers },
    { key: "teams", label: "Teams" },
    { key: "leaderboard", label: "Leaderboard" },
  ];

  const handleAction = async(type: string) => {
    try {
      switch (type) {
        case 'delete':
          await deleteTournament(id).unwrap()
          toast.success("Tournament deleted");
          router.push("/admin/tournaments")
          break
      }
    } catch (err) {
      console.log(err)
      toast.error(`Failed to ${type} tournament`)
    } finally {
    setConfirmAction(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title={tournament.name} />

      <TournamentDetailHeader
        tournament={tournament}
        onAssignRoom={() => setConfirmAction("assign room")}
        onStart={() => setConfirmAction("start")}
        onEnd={() => setConfirmAction("end")}
        onEdit={() => router.push(`/admin/tournaments/${id}/edit`)}
        onDelete={() => setConfirmAction("delete")}
      />

      <TournamentTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SectionCard title="Registration Stats">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Registered</span>
                <span className="text-sm font-semibold text-white">
                  {tournament.registeredPlayers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Max Players</span>
                <span className="text-sm font-semibold text-white">
                  {tournament.maxPlayers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Spots Left</span>
                <span className="text-sm font-semibold text-green-400">
                  {tournament.maxPlayers - tournament.registeredPlayers}
                </span>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Quick Info">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Game</span>
                <span className="text-sm font-semibold text-white">{tournament.game}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Mode</span>
                <span className="text-sm font-semibold text-white capitalize">
                  {tournament.mode.player}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Map</span>
                <span className="text-sm font-semibold text-white">
                  {tournament.mode.map}
                </span>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {activeTab === "participants" && (
        <ParticipantsTable
          participants={mockParticipants}
          loading={isLoading}
        />
      )}

      {activeTab === "teams" && (
        <TeamsTable
          teams={mockTeams}
          loading={isLoading}
          onDisqualify={(teamId) => console.log("Disqualify", teamId)}
          onDelete={(teamId) => console.log("Delete", teamId)}
        />
      )}

      {activeTab === "leaderboard" && (
        <LeaderboardEditor
          entries={mockLeaderboard}
          loading={isLoading}
          onSave={(entries) => console.log("Save leaderboard", entries)}
        />
      )}

      <ConfirmDialog
        open={!!confirmAction}
        onConfirm={() => handleAction(confirmAction!)}
        onCancel={() => setConfirmAction(null)}
        title={`${confirmAction ? confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1) : ""} Tournament`}
        description={`Are you sure you want to ${confirmAction ?? ""} this tournament?`}
        confirmLabel={confirmAction ?? "Confirm"}
        variant={confirmAction === "delete" ? "destructive" : "default"}
      />
    </div>
  );
}
