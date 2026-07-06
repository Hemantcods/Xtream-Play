'use client'
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Countdown from "react-countdown";
import { toast } from "sonner";
import { useState } from "react";
import RegistrationDialog from './RegisterationDialog'
import { Tournament } from "@/types/tournament";

interface CountdownProps {
  endDate: Date | string;
}
interface TournamentProps{
  tournamentData:Tournament
}
function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg bg-zinc-900 p-3 text-center text-white">
      <div className="text-2xl font-bold">{String(value).padStart(2, "0")}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
export default function RegistrationCard({ tournamentData }: TournamentProps) {
  const HandleClick = async() => {
    await navigator.clipboard.writeText(window.location.href)
    toast.success("Tournament Link Copied")
  }
  const [open,Setopen]=useState(true)
  return (
    <>
    <Card className="p-5 space-y-5 bg-[#13192A] text-white">
      <h3 className="font-semibold">Registration</h3>

      <div>
        <p className="mb-3 text-center text-sm">
          Registration Ends In
        </p>

        <RegistrationCountdown endDate={tournamentData.StartTime} />
      </div>

      <Button className="w-full bg-red-500" onClick={()=>Setopen(true)}>Apply Now</Button>
      
      <Button variant="outline" className="w-full text-black " onClick={()=>{HandleClick()}}>
        <Share2 className="mr-2 h-4 w-4" />
        Share Tournament
      </Button>
    </Card>
      <RegistrationDialog open={ open} onOpenChange={Setopen} tournament={tournamentData}/>
    </>
  );
}
function RegistrationCountdown({
  endDate,
}: CountdownProps) {
  return (
    <Countdown
      date={new Date(endDate)}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <p className="text-center text-red-500 font-semibold">
              Registration Closed
            </p>
          );
        }
        return (
          <div className="grid grid-cols-4 gap-3">
            <TimeBox value={days} label="Days" />
            <TimeBox value={hours} label="Hours" />
            <TimeBox value={minutes} label="Mins" />
            <TimeBox value={seconds} label="Secs" />
          </div>
        );
      }}
    />
  );
}