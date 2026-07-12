import type { RegisteredTeam } from "@/types/tournament";
import { cn } from "@/lib/utils";

interface TeamsTableProps {
  teams: RegisteredTeam[];
}

const statusStyles: Record<string, string> = {
  confirmed: "text-green-400 bg-green-500/15 border-green-500/30",
  pending: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  qualified: "text-blue-400 bg-blue-500/15 border-blue-500/30",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TeamsTable({ teams }: TeamsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-xs font-semibold uppercase tracking-wider text-white/40">
            <th className="px-3 py-3 w-12">#</th>
            <th className="px-3 py-3">Team Name</th>
            <th className="px-3 py-3 text-right">Total Points</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3 text-right">Registered On</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr
              key={team.id}
              className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
            >
              <td className="px-3 py-3.5 text-sm font-medium text-white/60">{index + 1}</td>
              <td className="px-3 py-3.5 text-sm font-semibold text-white">{team.teamName}</td>
              <td className="px-3 py-3.5 text-right text-sm font-bold text-white">{team.totalPoints}</td>
              <td className="px-3 py-3.5">
                <span
                  className={cn(
                    "inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    statusStyles[team.status],
                  )}
                >
                  {team.status}
                </span>
              </td>
              <td className="px-3 py-3.5 text-right text-sm text-white/60">{formatDate(team.registeredAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
