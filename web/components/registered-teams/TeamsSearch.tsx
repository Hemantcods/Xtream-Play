"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

interface TeamsSearchProps {
  onSearchChange: (value: string) => void;
  onStatusFilter: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function TeamsSearch({
  onSearchChange,
  onStatusFilter,
  onSortChange,
}: TeamsSearchProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 transition-all"
        />
      </div>

      <div className="flex gap-2">
        <select
          onChange={(e) => onStatusFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/70 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="qualified">Qualified</option>
        </select>

        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/70 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
        >
          <option value="points-desc">Points (High)</option>
          <option value="points-asc">Points (Low)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="date-desc">Recent</option>
          <option value="date-asc">Oldest</option>
        </select>

        <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/50 hover:bg-white/10 hover:text-white/70 transition-all">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>
    </div>
  );
}
