"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import {
  useGetTeamQuery,
  useLeaveTeamMutation,
  useUpdateTeamProfileMutation,
  useKickMemberMutation,
} from "@/store/api/teamApi";
import { Users, Copy, Check, UserMinus, LogOut, Shield } from "lucide-react";

interface TeamManagementCardProps {
  tournamentId: string;
}

const registrationBadge: Record<string, { label: string; className: string }> =
  {
    WAITING: {
      label: "Waiting",
      className: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
    },
    PARTIAL: {
      label: "Partial",
      className: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    },
    FULL: {
      label: "Full",
      className: "text-green-400 bg-green-500/15 border-green-500/30",
    },
  };

function getInitials(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function TeamManagementCard({
  tournamentId,
}: TeamManagementCardProps) {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data: res, isLoading, error } = useGetTeamQuery(tournamentId);
  const [leaveTeam, { isLoading: leaving }] = useLeaveTeamMutation();
  const [updateProfile, { isLoading: updating }] =
    useUpdateTeamProfileMutation();
  const [kickMember, { isLoading: kicking }] = useKickMemberMutation();

  const [copied, setCopied] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showKickDialog, setShowKickDialog] = useState<string | null>(null);

  const [editInGameName, setEditInGameName] = useState("");
  const [editUid, setEditUid] = useState("");

  const team = res?.data;
  const isCaptain = !!userId && team?.captainId === userId;

  const handleCopyCode = async () => {
    if (!team) return;
    try {
      await navigator.clipboard.writeText(team.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Invite code copied");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleLeave = async () => {
    try {
      await leaveTeam(tournamentId).unwrap();
      toast.success("Left the team");
      setShowLeaveDialog(false);
    } catch {
      toast.error("Failed to leave team");
    }
  };

  const handleKick = async (memberId: string) => {
    try {
      await kickMember({
        tournamentId,
        userId: memberId,
      }).unwrap();
      toast.success("Member removed");
      setShowKickDialog(null);
    } catch {
      toast.error("Failed to remove member");
    }
  };

  const handleEditProfile = async () => {
    try {
      await updateProfile({
        tournamentId,
        body: {
          inGameName: editInGameName,
          uid: editUid,
        },
      }).unwrap();
      toast.success("Profile updated");
      setShowEditDialog(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <Skeleton className="mb-3 h-5 w-32 bg-white/10" />
        <Skeleton className="mb-2 h-4 w-24 bg-white/10" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full bg-white/5" />
          <Skeleton className="h-8 w-full bg-white/5" />
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#13192A] p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
            <Users className="h-5 w-5 text-white/40" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">No Team Yet</h3>
            <p className="mt-1 text-xs text-white/50">
              Join or create a team from the tournament detail page to manage it
              here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13192A] overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">{team.teamName}</h3>
          <Badge
            variant="outline"
            className={`text-[10px] ${
              registrationBadge[team.registrationStatus]?.className ?? ""
            }`}
          >
            {registrationBadge[team.registrationStatus]?.label ??
              team.registrationStatus}
          </Badge>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
          <Users className="h-3.5 w-3.5" />
          <span>
            {team.joinedMembers}/{team.maxMembers} members
          </span>
          <span className="capitalize">{team.mode}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
          <code className="flex-1 text-xs font-mono text-white/80 select-all">
            {team.inviteCode}
          </code>
          <button
            onClick={handleCopyCode}
            className="shrink-0 text-white/40 hover:text-white/80 transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-3">
        <h4 className="mb-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
          Members ({team.members.length})
        </h4>
        <div className="space-y-2">
          {team.members.map((member) => (
            <div key={member.userId} className="flex items-center gap-2.5">
              <Avatar size="sm">
                <AvatarFallback className="text-[10px] bg-white/10 text-white/70">
                  {getInitials(member.inGameName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">
                  {member.inGameName}
                </p>
                <p className="text-[11px] text-white/40 truncate">
                  {member.uid}
                </p>
              </div>
              {isCaptain && member.userId !== userId && (
                <Dialog
                  open={showKickDialog === member.userId}
                  onOpenChange={(open) =>
                    setShowKickDialog(open ? member.userId : null)
                  }
                >
                  <DialogTrigger asChild>
                    <button className="shrink-0 text-white/30 hover:text-red-400 transition-colors">
                      <UserMinus className="h-4 w-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#13192A] border border-white/10">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Remove Member
                      </DialogTitle>
                      <DialogDescription className="text-white/50">
                        Are you sure you want to remove{" "}
                        <span className="text-white font-medium">
                          {member.inGameName}
                        </span>{" "}
                        from the team?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={() => handleKick(member.userId)}
                        disabled={kicking}
                      >
                        {kicking ? "Removing..." : "Remove"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {member.userId === userId && isCaptain && (
                <Shield className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-3 flex gap-2">
        {!isCaptain && (
          <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                Leave Team
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#13192A] border border-white/10">
              <DialogHeader>
                <DialogTitle className="text-white">Leave Team</DialogTitle>
                <DialogDescription className="text-white/50">
                  Are you sure you want to leave{" "}
                  <span className="text-white font-medium">
                    {team.teamName}
                  </span>
                  ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleLeave}
                  disabled={leaving}
                >
                  {leaving ? "Leaving..." : "Leave"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Dialog
          open={showEditDialog}
          onOpenChange={(open) => {
            setShowEditDialog(open);
            if (open) {
              const myMember = team.members.find((m) => m.userId === userId);
              setEditInGameName(myMember?.inGameName ?? "");
              setEditUid(myMember?.uid ?? "");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1 text-black  ">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#13192A] border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Profile</DialogTitle>
              <DialogDescription className="text-white/50">
                Update your in-game name and UID.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="ign" className="text-white/70">
                  In-Game Name
                </Label>
                <Input
                  id="ign"
                  value={editInGameName}
                  onChange={(e) => setEditInGameName(e.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="uid" className="text-white/70">
                  UID
                </Label>
                <Input
                  id="uid"
                  value={editUid}
                  onChange={(e) => setEditUid(e.target.value)}
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditProfile} disabled={updating}>
                {updating ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
