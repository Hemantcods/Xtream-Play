import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown, Medal, Trophy } from "lucide-react";
import { LeaderBoard } from "@/lib/services/userService";

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1)
    return <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />;

  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;

  if (rank === 3) return <Trophy className="h-5 w-5 text-amber-700" />;

  return <span>{rank}</span>;
};

export default function LeaderboardTable({ Board }: { Board: LeaderBoard[] }) {
  return (
    <div className="rounded-3xl border bg-white shadow-xl px-10">
      <div className="border-b px-6 py-5">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <p className="text-sm text-muted-foreground">
          Rankings based on tournament points.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Wins</TableHead>
            <TableHead>Total Earning</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Board.map((player) => (
            <TableRow
              key={player.rank}
              className="hover:bg-red-50 transition-colors"
            >
              <TableCell>
                <RankIcon rank={player.rank} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {player.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="font-semibold">{player.name}</div>

                  {player.rank === 1 && (
                    <Badge className="bg-red-600">MVP</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{player.totalWins}</TableCell>

              <TableCell>{player.totalEarning}</TableCell>

              <TableCell className="text-right font-bold text-red-600">
                {player.totalPoints}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
