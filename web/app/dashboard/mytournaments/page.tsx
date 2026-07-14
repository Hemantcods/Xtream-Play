"use client";

import { useState, useMemo } from "react";
import { RefreshCw } from "lucide-react";

import TournamentCard from "@/components/my-tournaments/TournamentCard";
import TournamentTabs, {
  type TabItem,
} from "@/components/my-tournaments/TournamentTabs";
import StatsCard from "@/components/my-tournaments/StatsCard";
import UpcomingMatchesCard from "@/components/my-tournaments/UpcomingMatchesCard";
import SupportCard from "@/components/my-tournaments/SupportCard";
import NotesCard from "@/components/my-tournaments/NotesCard";
import { useGetUserTournamentsQuery } from "@/store/api/tournamentApi";
export default function MyTournamentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data, isLoading, isFetching, isError, refetch } =
    useGetUserTournamentsQuery();

  const tournaments = data?.data.tournaments;
  const stats = data?.data.stats;
  const tabs: TabItem[] = [
    {
      key: "all",
      label: "All",
      count: stats?.total ?? 0,
    },
    {
      key: "upcoming",
      label: "Upcoming",
      count: stats?.upcoming ?? 0,
    },
    {
      key: "live",
      label: "Live",
      count: stats?.live ?? 0,
    },
    {
      key: "completed",
      label: "Completed",
      count: stats?.completed ?? 0,
    },
  ];
  const filteredTournaments = useMemo(() => {
    if (activeTab === "all") return tournaments;

    return tournaments?.filter((t) => t.status === activeTab);
  }, [activeTab, tournaments]);
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-white/70">Failed to load tournaments.</p>

        <button onClick={refetch} className="rounded-lg bg-red-600 px-4 py-2">
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full">
      <div className="flex w-full flex-col gap-6 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              My Tournaments
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Track your registered tournaments and match details
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        <TournamentTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex gap-6">
          <div className="min-w-0 flex-1 space-y-4">
            {filteredTournaments?.map((tournament) => (
              <TournamentCard key={tournament._id} tournament={tournament} />
            ))}

            {filteredTournaments?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-white/60">
                <p className="text-lg">
                  No {activeTab === "all" ? "" : activeTab} tournaments found.
                </p>
              </div>
            )}
          </div>

          <aside className="hidden w-80 shrink-0 flex-col gap-4 lg:flex">
            <StatsCard stats={stats!} />
            {/*<UpcomingMatchesCard matches={tournaments} />*/}
            <SupportCard />
            {/*<NotesCard notes={} />*/}
          </aside>
        </div>
      </div>
    </div>
  );
}
