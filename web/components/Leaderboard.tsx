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

const players = [
  {
    rank: 1,
    name: "Hemant",
    team: "Phoenix",
    matches: 12,
    wins: 10,
    winRate: "83%",
    points: 1890,
  },
  {
    rank: 2,
    name: "Ankush",
    team: "Titans",
    matches: 12,
    wins: 9,
    winRate: "75%",
    points: 1760,
  },
  {
    rank: 3,
    name: "Nitin",
    team: "Warriors",
    matches: 12,
    wins: 8,
    winRate: "66%",
    points: 1600,
  },
  {
    rank: 4,
    name: "Rohit",
    team: "Eagles",
    matches: 11,
    wins: 7,
    winRate: "63%",
    points: 1480,
  },
];

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1)
    return <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />;

  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;

  if (rank === 3) return <Trophy className="h-5 w-5 text-amber-700" />;

  return <span>{rank}</span>;
};

export default function LeaderboardTable() {
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
            <TableHead>Team</TableHead>
            <TableHead>Matches</TableHead>
            <TableHead>Wins</TableHead>
            <TableHead>Win Rate</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.map((player) => (
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
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="font-semibold">{player.name}</div>

                  {player.rank === 1 && (
                    <Badge className="bg-red-600">MVP</Badge>
                  )}
                </div>
              </TableCell>

              <TableCell>{player.team}</TableCell>

              <TableCell>{player.matches}</TableCell>

              <TableCell>{player.wins}</TableCell>

              <TableCell>
                <Badge variant="secondary">{player.winRate}</Badge>
              </TableCell>

              <TableCell className="text-right font-bold text-red-600">
                {player.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
