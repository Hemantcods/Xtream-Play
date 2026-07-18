"use client";

import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  Gamepad2,
  Map,
  DoorOpen,
  Play,
  Square,
  Pencil,
  Trash2,
} from "lucide-react";
import StatusBadge from "@/components/admin/common/StatusBadge";
import InfoRow from "@/components/admin/common/InfoRow";
import { formatDateTime } from "@/lib/utils";
import type { AdminTournament } from "@/types/admin";

interface TournamentDetailHeaderProps {
  tournament: AdminTournament;
  onAssignRoom?: () => void;
  onStart?: () => void;
  onEnd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TournamentDetailHeader({
  tournament,
  onAssignRoom,
  onStart,
  onEnd,
  onEdit,
  onDelete,
}: TournamentDetailHeaderProps) {
  const stats = [
    { label: "Registered", value: `${tournament.registeredPlayers}/${tournament.maxPlayers}`, icon: Users },
    { label: "Entry Fee", value: `₹${tournament.entryFee}`, icon: DollarSign },
    { label: "Prize Pool", value: `₹${tournament.prizePool}`, icon: DollarSign },
    { label: "Spots Left", value: tournament.maxPlayers - tournament.registeredPlayers, icon: Users },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-br from-accent-brand/20 via-accent-brand/10 to-transparent md:h-40" />

      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white md:text-2xl">
                {tournament.name}
              </h1>
              <StatusBadge status={tournament.status} />
            </div>
            {tournament.description && (
              <p className="text-sm text-white/50">{tournament.description}</p>
            )}

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <InfoRow label="Game" value={tournament.game} icon={Gamepad2} />
              <InfoRow label="Mode" value={`${tournament.mode.player} · ${tournament.mode.map}`} icon={Map} />
              <InfoRow label="Start Time" value={formatDateTime(tournament.StartTime)} icon={Calendar} />
              <InfoRow label="Registration Ends" value={formatDateTime(tournament.registrationEndsAt)} icon={Clock} />
              <InfoRow label="Entry Fee" value={`₹${tournament.entryFee}`} icon={DollarSign} />
              <InfoRow label="Prize Pool" value={`₹${tournament.prizePool}`} icon={DollarSign} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 md:w-64">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
              >
                <p className="text-xs text-white/50">{s.label}</p>
                <p className="mt-1 text-lg font-bold text-white">
                  {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {tournament.status === "upcoming" && (
            <>
              <button
                onClick={onStart}
                className="flex items-center gap-1.5 rounded-lg bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/25 transition-all"
              >
                <Play className="h-3.5 w-3.5" /> Start
              </button>
              <button
                onClick={onAssignRoom}
                className="flex items-center gap-1.5 rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/25 transition-all"
              >
                <DoorOpen className="h-3.5 w-3.5" /> Assign Room
              </button>
            </>
          )}
          {tournament.status === "running" && (
            <button
              onClick={onEnd}
              className="flex items-center gap-1.5 rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/25 transition-all"
            >
              <Square className="h-3.5 w-3.5" /> End Tournament
            </button>
          )}
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 transition-all"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
