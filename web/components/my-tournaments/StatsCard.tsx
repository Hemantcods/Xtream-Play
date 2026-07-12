import { BarChart3, TrendingUp, DollarSign, Trophy, Gamepad2, CheckCircle } from "lucide-react";
import type { TournamentStats } from "@/types/tournament";

interface StatsCardProps {
  stats: TournamentStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  const items = [
    { icon: BarChart3, label: "Total Tournaments", value: stats.total, color: "text-blue-400" },
    { icon: Gamepad2, label: "Upcoming", value: stats.upcoming, color: "text-yellow-400" },
    { icon: Trophy, label: "Live", value: stats.live, color: "text-red-400" },
    { icon: CheckCircle, label: "Completed", value: stats.completed, color: "text-green-400" },
    { icon: TrendingUp, label: "Total Wins", value: stats.totalWins, color: "text-purple-400" },
    { icon: DollarSign, label: "Total Earnings", value: `$${stats.totalEarnings.toLocaleString()}`, color: "text-emerald-400" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Your Stats</h3>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-xs text-white/60">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
