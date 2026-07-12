import { CalendarDays, DollarSign, Users, Trophy } from "lucide-react";

interface TournamentInfoProps {
  startDate: string;
  entryFee: number;
  teamType: string;
  prizePool: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TournamentInfo({
  startDate,
  entryFee,
  teamType,
  prizePool,
}: TournamentInfoProps) {
  const items = [
    { icon: CalendarDays, label: "Start Date", value: formatDate(startDate), color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { icon: DollarSign, label: "Entry Fee", value: `$${entryFee}`, color: "text-green-400", bg: "bg-green-500/10" },
    { icon: Users, label: "Team Type", value: teamType, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Trophy, label: "Prize Pool", value: `$${prizePool.toLocaleString()}`, color: "text-red-400", bg: "bg-red-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.bg}`}>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/40">{item.label}</p>
            <p className="truncate text-sm font-semibold text-white">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
