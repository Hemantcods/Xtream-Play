"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import PageHeader from "@/components/admin/common/PageHeader";
import TournamentForm from "@/components/admin/forms/TournamentForm";
import type { TournamentFormData } from "@/components/admin/forms/TournamentForm";
import type { AdminTournament } from "@/types/admin";
import { useGetAdminTournamentQuery, useUpdateAdminTournamentMutation } from "@/store/api/adminApi";
import { toast } from "sonner";

function computeDiff(
  original: AdminTournament,
  form: TournamentFormData,
): Record<string, unknown> {
  const changes: Record<string, unknown> = {};

  if (form.name !== original.name) changes.name = form.name;
  if (form.game !== original.game) changes.game = form.game;
  if (form.entryFee !== original.entryFee) changes.entryFee = form.entryFee;
  if (form.prizePool !== original.prizePool) changes.prizePool = form.prizePool;
  if (form.maxPlayers !== original.maxPlayers) changes.maxPlayers = form.maxPlayers;
  if (form.PerEliminationPrize !== 0) changes.PerEliminationPrize = form.PerEliminationPrize;

  const origMode = original.mode;
  if (
    form.mode.map !== origMode.map ||
    form.mode.player !== origMode.player ||
    form.mode.type !== origMode.type
  ) {
    changes.mode = {
      map: form.mode.map,
      player: form.mode.player,
      type: form.mode.type,
    };
  }

  const origPlacement = original.PlacementPrize;
  const hasPlacementChange =
    form.PlacementPrize &&
    (form.PlacementPrize.first !== (origPlacement?.first ?? 0) ||
      form.PlacementPrize.second !== (origPlacement?.second ?? 0) ||
      form.PlacementPrize.third !== (origPlacement?.third ?? 0));
  if (hasPlacementChange) {
    changes.PlacementPrize = {
      first: form.PlacementPrize!.first ?? 0,
      second: form.PlacementPrize!.second ?? 0,
      third: form.PlacementPrize!.third ?? 0,
    };
  }

  const formStart = form.StartTime ? new Date(form.StartTime).toISOString() : "";
  const origStart = original.StartTime ? new Date(original.StartTime).toISOString() : "";
  if (formStart && formStart !== origStart) changes.StartTime = formStart;

  return changes;
}

export default function EditTournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useGetAdminTournamentQuery(id)
  const [updateTournament] = useUpdateAdminTournamentMutation();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const tournament = data?.data
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <Skeleton className="h-8 w-48 bg-white/10" />
        <Skeleton className="h-4 w-64 bg-white/10" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-[#13192A] p-6">
              <Skeleton className="mb-4 h-4 w-32 bg-white/10" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-10 bg-white/5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">Tournament not found</h2>
          <p className="mt-1 text-sm text-white/50">Could not load tournament details.</p>
        </div>
        <button
          onClick={() => router.push("/admin/tournaments")}
          className="rounded-xl bg-accent-brand px-4 py-2 text-sm font-medium text-white hover:bg-accent-brand/80 transition-all"
        >
          Back to Tournaments
        </button>
      </div>
    );
  }

  const handleSubmit = async (data: TournamentFormData) => {
    setSubmitting(true);
    try {
      const body = computeDiff(tournament, data);
      if (Object.keys(body).length === 0) {
        toast.info("No changes detected");
        setSubmitting(false);
        return;
      }
      await updateTournament({ id, body }).unwrap()
      toast.success("Tournament updated")
      router.push(`/admin/tournaments/${id}`)
    } catch (err) {
      toast.error("Failed to update tournament")
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Tournament"
        description={`Editing: ${tournament.name}`}
      />

      <TournamentForm
        initialValues={tournament}
        onSubmit={handleSubmit}
        loading={submitting}
      />
    </div>
  );
}
