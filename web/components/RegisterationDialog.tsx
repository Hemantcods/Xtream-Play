"use client";

import { useState } from "react";
import { Tournament } from "@/types/tournament";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {
  Trophy,
  Coins,
  Gamepad2,
  Users,
  UserCheck,
  Wallet,
  AlertTriangle,
  Loader2,
  Info,
} from "lucide-react";
import { cn, getErrorMessage } from "@/lib/utils";
import { useJoinTournamentMutation } from "@/store/api/participantApi";
import { useJoinTeamMutation } from "@/store/api/teamApi";
import { useGetWalletQuery } from "@/store/api/walletApi";

type JoinMethod = "CREATE_TEAM" | "JOIN_TEAM";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournament: Tournament;
}

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-white/10">
        <Icon className="size-4 text-red-400" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function WalletRow({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className={cn("text-sm", className)}>{value}</span>
    </div>
  );
}

function getTeamSizeLabel(player: string): string {
  switch (player) {
    case "solo":
      return "Solo";
    case "duo":
      return "Duo";
    case "squad":
      return "Squad";
    default:
      return player;
  }
}

export default function RegistrationDialog({
  open,
  onOpenChange,
  tournament,
}: Props) {
  const [joinMethod, setJoinMethod] = useState<JoinMethod>("CREATE_TEAM");
  const [inGameName, setInGameName] = useState("");
  const [uid, setUid] = useState("");
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isSolo = tournament.mode.player === "solo";
  const isJoinTeam = joinMethod === "JOIN_TEAM";
  const isCreateTeam = joinMethod === "CREATE_TEAM";
  const { data:wallet}=useGetWalletQuery()
  const walletBalance = wallet?.data.balance ?? 0;
  const entryFee = tournament.entryFee;
  const remainingBalance = walletBalance - entryFee;
  const hasInsufficientFunds = remainingBalance < 0;

  const hasValidInviteCode = inviteCode.trim().length >= 6;
  const hasValidTeamName = teamName.trim().length > 0;

  const isFormValid =
    agreed &&
    inGameName.trim() &&
    uid.trim() &&
    (isJoinTeam
      ? hasValidInviteCode
      : (isSolo || hasValidTeamName) && !hasInsufficientFunds);

  const [joinTournament, { isLoading: isRegistering }] =
    useJoinTournamentMutation();
  const [joinTeam, { isLoading: isJoining }] = useJoinTeamMutation();

  const isSubmitting = isJoining || isRegistering;

  const handleJoinMethodChange = (method: JoinMethod) => {
    setJoinMethod(method);
    setErrors({});

    if (method === "JOIN_TEAM") {
      setTeamName("");
    } else {
      setInviteCode("");
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!inGameName.trim()) newErrors.inGameName = "In-Game name is required";
    if (!uid.trim()) newErrors.uid = "Game UID is required";

    if (isCreateTeam && !isSolo && !teamName.trim())
      newErrors.teamName = "Team name is required";

    if (isJoinTeam && !inviteCode.trim())
      newErrors.inviteCode = "Invite code is required";
    else if (isJoinTeam && inviteCode.trim().length < 6)
      newErrors.inviteCode = "Invite code must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      if (isJoinTeam) {
        await joinTeam({
          tournamentId: tournament._id,
          body: {
            inviteCode: inviteCode.trim(),
            inGameName: inGameName.trim(),
            uid: uid.trim(),
          },
        }).unwrap();

        toast.success("Successfully joined the team.");
      } else {
        await joinTournament({
          tournamentId: tournament._id,
          uid: uid.trim(),
          inGameName: inGameName.trim(),
          teamName: isSolo ? "" : teamName.trim(),
        }).unwrap();

        toast.success("Team created and tournament registration completed.");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const submitLabel = isJoinTeam ? "Join Team" : "Create Team";
  const submittingLabel = isJoinTeam ? "Joining..." : "Creating Team...";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Register For {tournament.name}
          </DialogTitle>
          <DialogDescription>
            Confirm your registration details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatItem
                  icon={Trophy}
                  label="Prize Pool"
                  value={`₹${tournament.prizePool}`}
                />
                <StatItem
                  icon={Coins}
                  label="Entry Fee"
                  value={`₹${entryFee}`}
                />
                <StatItem
                  icon={Gamepad2}
                  label="Game Mode"
                  value={tournament.mode.type}
                />
                <StatItem
                  icon={Users}
                  label="Team Size"
                  value={getTeamSizeLabel(tournament.mode.player)}
                />
                <StatItem
                  icon={UserCheck}
                  label="Registered"
                  value={`${tournament.registeredPlayers ?? 0}/${tournament.maxPlayers}`}
                />
                <StatItem
                  icon={Users}
                  label="Max Players"
                  value={String(tournament.maxPlayers)}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Player Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              {!isSolo && (
                <div className="flex gap-1 rounded-lg bg-gray-300 p-1">
                  <button
                    type="button"
                    onClick={() => handleJoinMethodChange("CREATE_TEAM")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isCreateTeam
                        ? "bg-red-500 text-white"
                        : "hover:text-black/80 hover:bg-gray-300"
                    }`}
                  >
                    Create a Team
                  </button>
                  <button
                    type="button"
                    onClick={() => handleJoinMethodChange("JOIN_TEAM")}
                    className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isJoinTeam
                        ? "bg-red-500 text-white"
                        : " hover:text-black/80 hover:bg-gray-300" 
                    }`}
                  >
                    Join via Invite Code
                  </button>
                </div>
              )}

              {isJoinTeam && (
                <div className="space-y-2">
                  <Label htmlFor="invite-code">Invite Code</Label>
                  <Input
                    id="invite-code"
                    placeholder="Enter team invite code"
                    value={inviteCode}
                    onChange={(e) => {
                      setInviteCode(e.target.value);
                      setErrors((p) => ({ ...p, inviteCode: "" }));
                    }}
                  />
                  {errors.inviteCode && (
                    <p className="text-xs text-red-400">{errors.inviteCode}</p>
                  )}
                </div>
              )}

              {isCreateTeam && !isSolo && (
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                      setErrors((p) => ({ ...p, teamName: "" }));
                    }}
                  />
                  {errors.teamName && (
                    <p className="text-xs text-red-400">{errors.teamName}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="ign">In-Game Name</Label>
                <Input
                  id="ign"
                  placeholder="Enter your in-game name"
                  value={inGameName}
                  onChange={(e) => {
                    setInGameName(e.target.value);
                    setErrors((p) => ({ ...p, inGameName: "" }));
                  }}
                />
                {errors.inGameName && (
                  <p className="text-xs text-red-400">{errors.inGameName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="uid">Game UID</Label>
                <Input
                  id="uid"
                  placeholder="Enter your game UID"
                  value={uid}
                  onChange={(e) => {
                    setUid(e.target.value);
                    setErrors((p) => ({ ...p, uid: "" }));
                  }}
                />
                {errors.uid && (
                  <p className="text-xs text-red-400">{errors.uid}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {isCreateTeam ? (
            <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <WalletRow
                  icon={Wallet}
                  label="Wallet Balance"
                  value={`₹${walletBalance}`}
                />
                <WalletRow
                  icon={Coins}
                  label="Entry Fee"
                  value={`-₹${entryFee}`}
                  className="text-red-400"
                />
                <Separator />
                <WalletRow
                  icon={Coins}
                  label="Remaining Balance"
                  value={`₹${Math.max(0, remainingBalance)}`}
                  className="font-semibold"
                />
                {hasInsufficientFunds && (
                  <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-400">
                        Insufficient Balance
                      </p>
                      <p className="text-xs text-red-400/80">
                        You need ₹{Math.abs(remainingBalance)} more to
                        register.
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="shrink-0"
                    >
                      <Coins className="mr-1 size-3.5" />
                      Add Coins
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-blue-400" />
              <p className="text-sm text-white/60">
                Captain has already paid the tournament entry fee. No payment
                needed when joining via invite code.
              </p>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="rules"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="rules" className="cursor-pointer">
                I agree to the tournament rules.
              </Label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
            >
              View Rules
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegister}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
