import { Users, ListChecks, Timer, Play, CheckCircle2, Wallet, DollarSign, UserPlus } from "lucide-react";
import MetricCard from "@/components/admin/common/MetricCard";
import type { AdminStats } from "@/types/admin";

interface DashboardStatsGridProps {
  stats?: AdminStats;
  loading?: boolean;
}

export default function DashboardStatsGrid({
  stats,
  loading,
}: DashboardStatsGridProps) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      gradient: true,
    },
    {
      title: "Active Tournaments",
      value: stats?.activeTournaments ?? 0,
      icon: ListChecks,
      gradient: true,
    },
    {
      title: "Upcoming",
      value: stats?.upcomingTournaments ?? 0,
      subtitle: "tournaments scheduled",
      icon: Timer,
    },
    {
      title: "Running",
      value: stats?.runningTournaments ?? 0,
      subtitle: "currently live",
      icon: Play,
    },
    {
      title: "Completed",
      value: stats?.completedTournaments ?? 0,
      subtitle: "finished tournaments",
      icon: CheckCircle2,
    },
    {
      title: "Wallet Balance",
      value: `₹${(stats?.walletBalance ?? 0).toLocaleString()}`,
      icon: Wallet,
    },
    {
      title: "Revenue",
      value: `₹${(stats?.revenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Pending Registrations",
      value: stats?.pendingRegistrations ?? 0,
      icon: UserPlus,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <MetricCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={"subtitle" in card ? card.subtitle : undefined}
          icon={card.icon}
          gradient={card.gradient}
          loading={loading}
        />
      ))}
    </div>
  );
}
