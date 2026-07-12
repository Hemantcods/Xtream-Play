"use client";

import {
  CheckCircle,
  Clock,
  Copy,
  CopyCheck,
  Hash,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import TournamentCountdown from "./TournamentCountdown";
import type { TournamentStatus } from "@/types/tournament";

interface TournamentStatusBannerProps {
  status: TournamentStatus;
  startTime: string;
  registrationConfirmed?: boolean;
  room: { roomId?: string; password?: string };
  round?: string;
  currentMap?: string;
}

function RegistrationCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-4 text-center">
      <CheckCircle className="h-7 w-7 text-green-400" />
      <div>
        <p className="text-sm font-bold text-green-400">
          Registration Confirmed
        </p>
        <p className="mt-0.5 text-xs font-medium text-green-300/60">
          Your spot has been secured
        </p>
      </div>
    </div>
  );
}

function CountdownCard({ startDate }: { startDate: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
      <TournamentCountdown targetDate={startDate} />
    </div>
  );
}

function WaitingCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-4 text-center">
      <Clock className="h-7 w-7 text-yellow-400" />
      <div>
        <p className="text-sm font-bold text-yellow-400">
          Waiting for Match ID & Password
        </p>
        <p className="mt-0.5 text-xs font-medium text-yellow-300/60">
          Match details will be shared 30 minutes before match.
        </p>
      </div>
    </div>
  );
}

function LiveStatusCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-center">
      <span className="relative flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500" />
      </span>
      <div>
        <p className="text-sm font-bold text-red-400">Match In Progress</p>
        <p className="mt-0.5 text-xs font-medium text-red-300/60">
          Currently playing
        </p>
      </div>
    </div>
  );
}

function RoundMapCard({
  round,
  currentMap,
}: {
  round?: string;
  currentMap?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
        Round
      </p>
      <p className="text-base font-bold text-white">{round || "—"}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
        Map
      </p>
      <p className="text-base font-bold text-white">{currentMap || "—"}</p>
    </div>
  );
}

function RoomInfoCard({
  roomId,
  roomPassword,
}: {
  roomId?: string;
  roomPassword?: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
      <div className="flex items-center gap-1.5">
        <Hash className="h-3.5 w-3.5 text-white/40" />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
          Room ID
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-white">{roomId || "—"}</span>
        {roomId && (
          <button
            onClick={() => copyToClipboard(roomId, "id")}
            className="rounded p-0.5 text-white/40 hover:text-white/80 transition-colors"
          >
            {copied === "id" ? (
              <CopyCheck className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <ExternalLink className="h-3.5 w-3.5 text-white/40" />
        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
          Password
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-white">
          {roomPassword || "—"}
        </span>
        {roomPassword && (
          <button
            onClick={() => copyToClipboard(roomPassword, "pass")}
            className="rounded p-0.5 text-white/40 hover:text-white/80 transition-colors"
          >
            {copied === "pass" ? (
              <CopyCheck className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function CompletedStatusCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-4 text-center">
      <CheckCircle className="h-7 w-7 text-green-400" />
      <div>
        <p className="text-sm font-bold text-green-400">Tournament Completed</p>
        <p className="mt-0.5 text-xs font-medium text-green-300/60">
          Results finalized
        </p>
      </div>
    </div>
  );
}

function CompletedPlaceholderCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center">
      <p className="text-sm font-semibold text-white/40">Results</p>
      <p className="text-xs font-medium text-white/30">Coming soon</p>
    </div>
  );
}

export default function TournamentStatusBanner(
  props: TournamentStatusBannerProps,
) {
  const baseGrid = "flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-3";

  if (props.status === "upcoming") {
    return (
      <div className={baseGrid}>
        <RegistrationCard />
        <CountdownCard startDate={props.startTime} />
        <WaitingCard />
      </div>
    );
  }

  if (props.status === "live") {
    return (
      <div className={baseGrid}>
        <LiveStatusCard />
        <RoundMapCard round={props.round} currentMap={props.currentMap} />
        <RoomInfoCard roomId={props.room.roomId} roomPassword={props.room.password} />
      </div>
    );
  }

  return (
    <div className={baseGrid}>
      <CompletedStatusCard />
      <CompletedPlaceholderCard />
      <CompletedPlaceholderCard />
    </div>
  );
}
