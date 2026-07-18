"use client";

import { useState, useMemo } from "react";
import {
  Eye,
  Pencil,
  DoorOpen,
  Play,
  Square,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";
import DataTable, { type Column } from "@/components/admin/common/DataTable";
import StatusBadge from "@/components/admin/common/StatusBadge";
import SearchBar from "@/components/admin/common/SearchBar";
import ActionDropdown from "@/components/admin/common/ActionDropdown";
import type { AdminTournament } from "@/types/admin";

interface TournamentTableProps {
  tournaments: AdminTournament[];
  loading?: boolean;
  onStart?: (id: string) => void;
  onEnd?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAssignRoom?: (id: string) => void;
}

export default function TournamentTable({
  tournaments,
  loading,
  onStart,
  onEnd,
  onDelete,
  onAssignRoom,
}: TournamentTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [gameFilter, setGameFilter] = useState("all");

  const games = useMemo(() => {
    const g = new Set(tournaments.map((t) => t.game));
    return Array.from(g);
  }, [tournaments]);

  const filtered = useMemo(() => {
    return tournaments.filter((t) => {
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || t.status === statusFilter;
      const matchesGame =
        gameFilter === "all" || t.game === gameFilter;
      return matchesSearch && matchesStatus && matchesGame;
    });
  }, [tournaments, search, statusFilter, gameFilter]);

  const columns: Column<AdminTournament>[] = [
    {
      key: "banner",
      header: "",
      className: "w-12",
      cell: () => (
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-brand/20 to-accent-brand/5" />
      ),
    },
    {
      key: "name",
      header: "Tournament",
      cell: (t) => (
        <span className="font-semibold text-white">{t.name}</span>
      ),
    },
    {
      key: "game",
      header: "Game",
      cell: (t) => (
        <span className="text-white/70">{t.game}</span>
      ),
    },
    {
      key: "mode.player",
      header: "Mode",
      cell: (t) => (
        <span className="text-white/70 capitalize">{t.mode.player}</span>
      ),
    },
    {
      key: "registeredPlayers",
      header: "Players",
      className: "text-center",
      cell: (t) => (
        <span className="text-white/70">
          {t.registeredPlayers}/{t.maxPlayers}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (t) => <StatusBadge status={t.status||"UPCOMING"} />,
    },
    {
      key: "StartTime",
      header: "Start Time",
      cell: (t) => (
        <span className="text-xs text-white/50">
          {formatDateTime(t.StartTime)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      cell: (t) => (
        <ActionDropdown
          actions={[
            {
              label: "View",
              icon: Eye,
              onClick: () => router.push(`/admin/tournaments/${t._id}`),
            },
            {
              label: "Edit",
              icon: Pencil,
              onClick: () => router.push(`/admin/tournaments/${t._id}/edit`),
            },
            {
              label: "Assign Room",
              icon: DoorOpen,
              onClick: () => onAssignRoom?.(t._id),
            },
            {
              label: "Start",
              icon: Play,
              onClick: () => onStart?.(t._id),
            },
            {
              label: "End",
              icon: Square,
              onClick: () => onEnd?.(t._id),
            },
            {
              label: "Delete",
              icon: Trash2,
              variant: "destructive",
              onClick: () => onDelete?.(t._id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search tournaments..."
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/70 focus:border-accent-brand/40 focus:outline-none focus:ring-1 focus:ring-accent-brand/20 appearance-none cursor-pointer transition-all"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/70 focus:border-accent-brand/40 focus:outline-none focus:ring-1 focus:ring-accent-brand/20 appearance-none cursor-pointer transition-all"
        >
          <option value="all">All Games</option>
          {games.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#13192A]">
        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
          emptyMessage="No tournaments found"
          keyExtractor={(t) => t._id}
          mobileCard={(t) => (
            <div
              onClick={() => router.push(`/admin/tournaments/${t._id}`)}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-[#13192A] px-4 py-3.5 transition-all duration-200 hover:border-accent-brand/30"
            >
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-accent-brand/20 to-accent-brand/5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/50">
                  {t.game} · {t.mode.player} · {t.registeredPlayers}/{t.maxPlayers}
                </p>
              </div>
              <StatusBadge status={t.status || "UPCOMING"} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
