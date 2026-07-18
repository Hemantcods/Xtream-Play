"use client";

import { useState, useMemo } from "react";
import { Eye, Ban, Trash2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import DataTable, { type Column } from "@/components/admin/common/DataTable";
import StatusBadge from "@/components/admin/common/StatusBadge";
import SearchBar from "@/components/admin/common/SearchBar";
import ActionDropdown from "@/components/admin/common/ActionDropdown";
import type { AdminTeam } from "@/types/admin";

interface TeamsTableProps {
  teams: AdminTeam[];
  loading?: boolean;
  onView?: (id: string) => void;
  onDisqualify?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function TeamsTable({
  teams,
  loading,
  onView,
  onDisqualify,
  onDelete,
}: TeamsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return teams;
    const q = search.toLowerCase();
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.captain.name.toLowerCase().includes(q),
    );
  }, [teams, search]);

  const columns: Column<AdminTeam>[] = [
    {
      key: "name",
      header: "Team Name",
      cell: (t) => <span className="font-semibold text-white">{t.name}</span>,
    },
    {
      key: "captain",
      header: "Captain",
      cell: (t) => <span className="text-white/70">{t.captain.name}</span>,
    },
    {
      key: "members",
      header: "Members",
      cell: (t) => (
        <span className="text-white/50">{t.members.length + 1}</span>
      ),
    },
    {
      key: "points",
      header: "Points",
      className: "text-right",
      cell: (t) => (
        <span className="font-bold text-white">{t.points}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (t) => <StatusBadge status={t.status} />,
    },
    {
      key: "registeredAt",
      header: "Registered At",
      cell: (t) => (
        <span className="text-xs text-white/50">
          {formatDateTime(t.registeredAt)}
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
              onClick: () => onView?.(t._id),
            },
            {
              label: "Disqualify",
              icon: Ban,
              variant: "destructive",
              onClick: () => onDisqualify?.(t._id),
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
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search teams..."
      />
      <div className="rounded-2xl border border-white/10 bg-[#13192A]">
        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
          emptyMessage="No teams found"
          keyExtractor={(t) => t._id}
          mobileCard={(t) => (
            <div className="rounded-2xl border border-white/10 bg-[#13192A] px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{t.name}</span>
                <StatusBadge status={t.status} />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                <span>Captain: {t.captain.name}</span>
                <span>{t.members.length + 1} members</span>
                <span className="font-bold text-white/80">{t.points} pts</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
