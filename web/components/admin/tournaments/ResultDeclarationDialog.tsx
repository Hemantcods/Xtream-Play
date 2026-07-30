"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { FileText, Send, AlertTriangle } from "lucide-react";
import type { TeamResult } from "@/types/admin";
import {
  useDraftResultsMutation,
  usePublishResultsMutation,
  useGetAdminTournamentQuery,
  useGetAdminTeamsQuery,
} from "@/store/api/adminApi";
import { calculateScore } from "@/lib/utils";

interface ResultDeclarationDialogProps {
  tournamentId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function ResultDeclarationDialog({
  tournamentId,
  open,
  onClose,
}: ResultDeclarationDialogProps) {
  const { data: tournamentRes } = useGetAdminTournamentQuery(
    tournamentId ?? "",
    { skip: !tournamentId },
  );
  const mode = tournamentRes?.data?.mode?.player ?? "squad";

  const {
    data: teamsRes,
    isLoading: teamsLoading,
  } = useGetAdminTeamsQuery(tournamentId ?? "", {
    skip: !tournamentId,
  });
  const [draftResults, { isLoading: isDrafting }] = useDraftResultsMutation();
  const [publishResults, { isLoading: isPublishing }] =
    usePublishResultsMutation();

  const [edits, setEdits] = useState<
    Record<string, { placement: number; kills: number }>
  >({});
  const teams = teamsRes?.data?.teams ?? [];

  useEffect(() => {
    if (open && teams.length > 0) {
      const initial: Record<string, { placement: number; kills: number }> = {};
      teams.forEach((t) => {
        initial[t._id] = {
          placement: t.placement ?? 0,
          kills: t.kills,
        };
      });
      setEdits(initial);
    }
  }, [open, teams]);

  const handleEdit = (
    teamId: string,
    field: "placement" | "kills",
    value: string,
  ) => {
    const num = parseInt(value, 10);
    if (value !== "" && isNaN(num)) return;

    setEdits((prev) => {
      const current = prev[teamId] ?? { placement: 0, kills: 0 };
      return {
        ...prev,
        [teamId]: { ...current, [field]: value === "" ? 0 : num },
      };
    });
  };

  const getValue = (
    teamId: string,
    field: "placement" | "kills",
  ): string => {
    if (!edits[teamId]) return "";
    const v = edits[teamId][field];
    return v === 0 ? "" : String(v);
  };

  const getPoints = (teamId: string): number => {
    const e = edits[teamId];
    if (!e) return 0;
    return calculateScore(mode, e.placement, e.kills);
  };

  const hasEdits = Object.keys(edits).length > 0;

  const placements = Object.values(edits).map((r) => r.placement);
  const hasDuplicatePlacement =
    new Set(placements).size !== placements.length;

  const canSubmit = hasEdits && !hasDuplicatePlacement;

  const submitResults = async (status: "draft" | "published") => {
    if (!tournamentId) return;

    const results: TeamResult[] = Object.entries(edits).map(
      ([teamId, data]) => ({
        teamId,
        placement: data.placement,
        kills: data.kills,
        points: calculateScore(mode, data.placement, data.kills),
      }),
    );

    try {
      if (status === "draft") {
        await draftResults({ tournamentId, results }).unwrap();
        toast.success("Results drafted");
      } else {
        await publishResults({ tournamentId, results }).unwrap();
        toast.success("Results published");
      }
      setEdits({});
      onClose();
    } catch {
      toast.error(
        status === "draft"
          ? "Failed to draft results"
          : "Failed to publish results",
      );
    }
  };

  const isSubmitting = isDrafting || isPublishing;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Declare Results</DialogTitle>
          <DialogDescription>
            Enter placement and kills for each team. Points are auto-calculated.
          </DialogDescription>
        </DialogHeader>

        {teamsLoading ? (
          <div className="space-y-3 py-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-white/10" />
            ))}
          </div>
        ) : teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-white/40">
            <p className="text-base">No active teams found</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#13192A]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
                    <th className="px-4 py-3">Team</th>
                    <th className="w-28 px-4 py-3 text-right">Placement</th>
                    <th className="w-28 px-4 py-3 text-right">Kills</th>
                    <th className="w-28 px-4 py-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr
                      key={team._id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">
                          {team.teamName}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right text-white">
                        <Input
                          type="text"
                          defaultValue={getValue(team._id, "placement")}
                          onChange={(e) =>
                            handleEdit(team._id, "placement", e.target.value)
                          }
                          placeholder="—"
                          className="w-20 ml-auto text-right"
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-white">
                        <Input
                          type="text"
                          value={getValue(team._id, "kills")}
                          onChange={(e) =>
                            handleEdit(team._id, "kills", e.target.value)
                          }
                          placeholder="—"
                          className="w-20 ml-auto text-right"
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-white font-semibold">
                        {getPoints(team._id)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasDuplicatePlacement && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">
                  Duplicate placements detected. Each team must have a unique
                  placement.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => submitResults("draft")}
              disabled={!canSubmit || isSubmitting}
            >
              <FileText className="mr-1.5 h-4 w-4" />
              {isDrafting ? "Drafting..." : "Draft Result"}
            </Button>
            <Button
              onClick={() => submitResults("published")}
              disabled={!canSubmit || isSubmitting}
            >
              <Send className="mr-1.5 h-4 w-4" />
              {isPublishing ? "Publishing..." : "Publish Result"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
