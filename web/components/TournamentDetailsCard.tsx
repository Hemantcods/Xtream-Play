import {
  CalendarDays,
  ClipboardList,
  Clock3,
  Crown,
  MapPin,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tournament } from "@/types/tournament";
import { formatDateTime } from "@/lib/utils";

export default function TournamentDetailsCard({tournament}:TournamentOverviewProps) {
  const details = [
    {
      icon: CalendarDays,
      label: "Start Date",
      value: formatDateTime(tournament.StartTime),
    },
    {
      icon: Clock3,
      label: "Registration Ends",
      value: formatDateTime(tournament.StartTime) ,
    },
    {
      icon: Trophy,
      label: "Tournament Type",
      value: "Online",
    },
    {
      icon: Users,
      label: "Team Type",
      value: "Squad (4 Players)",
    },
    {
      icon: Crown,
      label: "Min Rank Requirement",
      value: "Platinum I and above",
    },
    {
      icon: MapPin,
      label: "Region",
      value: "Asia",
    },
    {
      icon: UserRound,
      label: "Max Participants",
      value: `${tournament.maxPlayers} Players`,
    },
    {
      icon: ClipboardList,
      label: "Match Format",
      value: tournament.mode.type,
    },
  ];
  return (
    <Card className="bg-[#13192A] flex w-full text-white p-10">
      <CardTitle className="text-lg font-semibold">
        Tournament Details
      </CardTitle>
      <CardContent className="space-y-1">
        {details.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="grid grid-cols-1 gap-2 border-b border-white/10 py-3 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
            >
              <div className="flex items-center gap-3 text-white/70">
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </div>

              <div className="font-medium text-white">{item.value}</div>
            </div>
          );
        })}
        {/* Key Rules */}
        <div className="grid grid-cols-[280px_1fr] items-start py-3">
          <div className="flex items-center gap-3 ">
            <ClipboardList className="h-4 w-4" />
            <span>Key Rules</span>
          </div>

          <div className="space-y-3">
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li>Emulator not allowed</li>
              <li>Fair play is mandatory</li>
            </ul>

            <Button
              variant="link"
              className="h-auto p-0 text-red-500 hover:text-red-400"
            >
              View All Rules
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TournamentOverviewProps {
  tournament: Tournament;
}
export function TournamentOverview({ tournament }: TournamentOverviewProps) {
  const stats = [
    {
      title: "Game",
      value: tournament.game,
    },
    {
      title: "Entry Fee",
      value: `₹${tournament.entryFee}`,
    },
    {
      title: "Team Type",
      value: tournament.mode?.player,
    },
    {
      title: "Prize Pool",
      value: `₹${tournament.prizePool ?? '0'}`,
    },
  ];
  return (
    <div className="rounded-2xl bg-[#13192A] p-5 flex flex-col gap-5">
      <h1 className="text-xl">Tournament Overview</h1>
      <p>Gear up for the battle</p>
      <div className="grid grid-cols-2 gap-3 lg:flex lg:gap-5">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-xl bg-[#111622] p-4">
            <p className="text-sm text-white/60">{stat.title}</p>
            <p className="mt-2 font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
