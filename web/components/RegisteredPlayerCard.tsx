import { Users } from "lucide-react";
import { Card, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";

interface RegisteredPlayersCardProps {
  registered: number;
  total: number;
}
export default function RegisteredPlayersCard({
  registered,
  total,
}: RegisteredPlayersCardProps) {
  const percentage = Math.round((registered / total) * 100);
  const spotsLeft = total - registered;
  return (
    <Card className="p-6  bg-[#13192A] border-[#1C2436] text-white space-y-5">
      <CardHeader className="text-lg font-semibold">
        Registered Player
      </CardHeader>
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-gray-300" />
        <div className="text-3xl font-bold text-red-500">{registered}</div>
        <div className="text-2xl text-gray-300">/ {total} Teams Registered</div>
      </div>
      <div className="flex items-center gap-4">
        <Progress value={percentage} indicatorClassName="bg-red-500" className="h-4 flex-1" />
        <span className="text-xl font-semibold">{percentage}%</span>
      </div>
      <div className="flex">
        <div className="mt-3 flex items-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="font-semibold text-green-500">{registered}</span>
            <span className="text-muted-foreground">Joined</span>
          </div>
        
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
            <span className="font-semibold text-slate-400">{spotsLeft}</span>
            <span className="text-muted-foreground">Spots Left</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
