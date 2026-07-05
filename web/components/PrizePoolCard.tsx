
import { Award, LucideIcon, Medal, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { Tournament } from "@/types/tournament";
export interface PrizeItem {
  place: string;
  amount: number;
  icon: LucideIcon;
  color: string;
}
interface PrizePoolProps {
  tournament:Tournament
}

export default function PrizePoolCard({ tournament }: PrizePoolProps) {
  if (!tournament) return (<> LOADING</>)
  const totalPrize = tournament?.prizePool
  const hasKillPrizes=tournament.PerElimination >0
  const killPrize = tournament?.PerElimination
  const prizes= [
      {
        place: "1st Place",
        amount: tournament?.PlacementPrize?.first?? 0 ,
        icon: Trophy,
        color: "text-yellow-500",
      },
      {
        place: "2nd Place",
        amount: tournament.PlacementPrize?.second ?? 0,
        icon: Medal,
        color: "text-gray-400",
      },
      {
        place: "3rd Place",
        amount: tournament.PlacementPrize?.third?? 0,
        icon: Award,
        color: "text-orange-500",
      },
    ]
  return (
    <Card className="p-5 bg-[#111827] border-slate-800 text-white">
      <h3 className="font-semibold mb-5">Prize Pool</h3>

      <p className="text-sm text-slate-400">Total Prize</p>

      <h2 className="text-4xl font-bold text-red-500 mb-6">
        ₹{totalPrize}
      </h2>

      <div className="space-y-3">
        {prizes.map(({ place, amount, icon: Icon, color }) => (
          <div
            key={place}
            className="flex items-center justify-between border-b border-slate-800 pb-3"
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${color}`} />
              <span>{place}</span>
            </div>

            <span>₹{amount}</span>
          </div>
        ))}

        {hasKillPrizes && (
          <div className="flex justify-between">
            <span>Per Kill</span>
            <span>₹{killPrize}</span>
          </div>
        )}
      </div>
    </Card>
  );
}