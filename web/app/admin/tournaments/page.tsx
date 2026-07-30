"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/common/PageHeader";
import TournamentTable from "@/components/admin/tournaments/TournamentTable";
import ConfirmDialog from "@/components/admin/common/ConfirmDialog";
import { useGetAdminTournamentsQuery } from "@/store/api/adminApi";
import { AdminTournament } from "@/types/admin";
import AssignRoomDialog from "@/components/admin/tournaments/AssignRoomDialog";
import ResultDeclarationDialog from "@/components/admin/tournaments/ResultDeclarationDialog";

export default function TournamentsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useGetAdminTournamentsQuery();
  if (data) {
    console.log(data);
  }
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    type: string;
  } | null>(null);
  const [roomDialog, setRoomDialog] = useState<{ tournamentId: string; roomId?: string; roomPassword:string} |null>(null)
  const [resultDialogTarget, setResultDialogTarget] = useState<string | null>(null);
  const handleDelete = (id: string) => setDeleteTarget(id);
  const confirmDelete = () => {
    console.log("Delete tournament", deleteTarget);
    setDeleteTarget(null);
  };

  const handleStart = (id: string) => setConfirmAction({ id, type: "start" });
  const handleEnd = (id: string) => setConfirmAction({ id, type: "end" });
  const handleResults = (id: string) => setResultDialogTarget(id);

  const handleAssignRoom = (tournament: AdminTournament) => {
    setRoomDialog({
      tournamentId: tournament._id!,
      roomId: tournament.roomId!,
      roomPassword: tournament.roomPassword!,
    })
  }

  const confirmActionHandler = () => {
    if (!confirmAction) return;
    console.log(`${confirmAction.type} tournament`, confirmAction.id);
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tournaments"
        description="Manage all tournaments"
        actions={
          <button
            onClick={() => router.push("/admin/tournaments/create")}
            className="flex items-center gap-2 rounded-xl bg-accent-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-brand/80 transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Tournament
          </button>
        }
      />
      {data && (
        <TournamentTable
          tournaments={data?.data?.tournaments}
          loading={isLoading}
          onStart={handleStart}
          onEnd={handleEnd}
          onDelete={handleDelete}
          onAssignRoom={handleAssignRoom}
          onResults={handleResults}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        title="Delete Tournament"
        description="Are you sure? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
      />

      <ConfirmDialog
        open={!!confirmAction}
        onConfirm={confirmActionHandler}
        onCancel={() => setConfirmAction(null)}
        title={`${confirmAction?.type ? confirmAction.type.charAt(0).toUpperCase() + confirmAction.type.slice(1) : ""} Tournament`}
        description={`Are you sure you want to ${confirmAction?.type ?? ""} this tournament?`}
        confirmLabel={confirmAction?.type ?? "Confirm"}
      />
      <AssignRoomDialog open={!!roomDialog} roomData={roomDialog} onClose={()=>setRoomDialog(null)}  />
      <ResultDeclarationDialog
        tournamentId={resultDialogTarget}
        open={!!resultDialogTarget}
        onClose={() => setResultDialogTarget(null)}
      />
    </div>
  );
}
