import { DollarSign, Users, Gamepad2, Trophy } from "lucide-react";
import type { TournamentSummary } from "@/types/tournament";

interface TournamentStatsCardProps {
  summary: TournamentSummary;
}

export default function TournamentStatsCard({ summary }: TournamentStatsCardProps) {
  const items = [
    { icon: Trophy, label: "Prize Pool", value: `$${summary.prizePool.toLocaleString()}`, color: "text-red-400" },
    { icon: DollarSign, label: "Entry Fee", value: `$${summary.entryFee}`, color: "text-green-400" },
    { icon: Gamepad2, label: "Team Type", value: summary.mode, color: "text-purple-400" },
    { icon: Users, label: "Max Teams", value: summary.maxPlayers.toString(), color: "text-blue-400" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Tournament Stats</h3>
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
