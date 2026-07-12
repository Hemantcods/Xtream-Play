"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import TeamsHeader from "@/components/registered-teams/TeamsHeader";
import TeamsStats from "@/components/registered-teams/TeamsStats";
import TeamsSearch from "@/components/registered-teams/TeamsSearch";
import TeamsTable from "@/components/registered-teams/TeamsTable";
import MobileTeamsList from "@/components/registered-teams/MobileTeamsList";
import Pagination from "@/components/registered-teams/Pagination";
import TournamentSummaryCard from "@/components/registered-teams/TournamentSummaryCard";
import TournamentStatsCard from "@/components/registered-teams/TournamentStatsCard";
import HelpCard from "@/components/registered-teams/HelpCard";
import NotesCard from "@/components/registered-teams/NotesCard";
import { mockRegisteredTeams, mockTournamentSummary } from "@/mock/registeredTeams";
import { mockNotes } from "@/mock/myTournament";
import type { RegisteredTeam } from "@/types/tournament";

const PAGE_SIZE = 10;

export default function RegisteredTeamsPage() {
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("points-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTeams = useMemo(() => {
    let teams = [...mockRegisteredTeams];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      teams = teams.filter((t) => t.teamName.toLowerCase().includes(q));
    }

    if (statusFilter !== "all") {
      teams = teams.filter((t) => t.status === statusFilter);
    }

    teams.sort((a, b) => {
      switch (sortBy) {
        case "points-desc": return b.totalPoints - a.totalPoints;
        case "points-asc": return a.totalPoints - b.totalPoints;
        case "name-asc": return a.teamName.localeCompare(b.teamName);
        case "name-desc": return b.teamName.localeCompare(a.teamName);
        case "date-desc": return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
        case "date-asc": return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
        default: return 0;
      }
    });

    return teams;
  }, [searchQuery, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredTeams.length / PAGE_SIZE);
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex w-full flex-col gap-6 p-4 lg:p-6">
        <TeamsHeader
          tournamentTitle={mockTournamentSummary.title}
          backHref="/dashboard/mytournaments"
        />

        <TeamsStats summary={mockTournamentSummary} />

        <TeamsSearch
          onSearchChange={handleSearchChange}
          onStatusFilter={handleStatusFilter}
          onSortChange={handleSortChange}
        />

        <div className="flex gap-6">
          <div className="min-w-0 flex-1 space-y-4">
            <div className="hidden lg:block">
              <TeamsTable teams={paginatedTeams} />
            </div>
            <div className="lg:hidden">
              <MobileTeamsList teams={paginatedTeams} />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTeams.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>

          <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex ">
            <TournamentSummaryCard summary={mockTournamentSummary} />
            <TournamentStatsCard summary={mockTournamentSummary} />
            <HelpCard />
            <NotesCard notes={mockNotes} />
          </aside>
        </div>
      </div>
    </div>
  );
}
