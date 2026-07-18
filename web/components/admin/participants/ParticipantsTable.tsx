"use client";

import { useState, useMemo } from "react";
import { formatDateTime } from "@/lib/utils";
import DataTable, { type Column } from "@/components/admin/common/DataTable";
import StatusBadge from "@/components/admin/common/StatusBadge";
import SearchBar from "@/components/admin/common/SearchBar";
import type { AdminParticipant } from "@/types/admin";

interface ParticipantsTableProps {
  participants: AdminParticipant[];
  loading?: boolean;
}

export default function ParticipantsTable({
  participants,
  loading,
}: ParticipantsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return participants;
    const q = search.toLowerCase();
    return participants.filter(
      (p) =>
        p.inGameName.toLowerCase().includes(q) ||
        p.uid.includes(q) ||
        p.teamName?.toLowerCase().includes(q),
    );
  }, [participants, search]);

  const columns: Column<AdminParticipant>[] = [
    {
      key: "inGameName",
      header: "IGN",
      cell: (p) => <span className="font-medium text-white">{p.inGameName}</span>,
    },
    {
      key: "uid",
      header: "UID",
      cell: (p) => (
        <span className="font-mono text-xs text-white/50">{p.uid}</span>
      ),
    },
    {
      key: "teamName",
      header: "Team",
      cell: (p) => (
        <span className="text-white/70">{p.teamName || "—"}</span>
      ),
    },
    {
      key: "joinedAt",
      header: "Joined Time",
      cell: (p) => (
        <span className="text-xs text-white/50">
          {formatDateTime(p.joinedAt)}
        </span>
      ),
    },
    {
      key: "entryFee",
      header: "Entry Fee",
      className: "text-right",
      cell: (p) => (
        <span className="font-medium text-white">₹{p.entryFee}</span>
      ),
    },
    {
      key: "walletPaid",
      header: "Wallet Paid",
      cell: (p) => (
        <span
          className={`text-xs font-medium ${
            p.walletPaid ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {p.walletPaid ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => <StatusBadge status={p.status} />,
    },
  ];

  return (
    <div className="space-y-4">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by IGN, UID, or team..."
      />
      <div className="rounded-2xl border border-white/10 bg-[#13192A]">
        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
          emptyMessage="No participants found"
          keyExtractor={(p) => p._id}
          mobileCard={(p) => (
            <div className="rounded-2xl border border-white/10 bg-[#13192A] px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{p.inGameName}</span>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                <span>UID: {p.uid}</span>
                <span>Team: {p.teamName || "—"}</span>
                <span>₹{p.entryFee}</span>
                <span className={p.walletPaid ? "text-green-400" : "text-yellow-400"}>
                  {p.walletPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
