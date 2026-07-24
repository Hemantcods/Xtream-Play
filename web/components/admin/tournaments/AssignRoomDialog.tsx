"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/utils";
import { useAssignRoomMutation } from "@/store/api/adminApi";
import { useEffectEvent } from "radix-ui/internal";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AssignRoomProps {
  open: boolean;
  onClose: () => void;
  roomData: {
    tournamentId: string;
    roomId?: string;
    roomPassword?: string;
  } | null;
}
export default function AssignRoomDialog({
  open,
  onClose,
  roomData,
}: AssignRoomProps) {
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [assignRoom, { isLoading }] = useAssignRoomMutation();
  const updateRoomIdPass = useEffectEvent((data) => {
    setRoomId(data.roomId ?? "");
    setRoomPassword(data.roomPassword ?? "");
  });
  useEffect(() => {
    if (!roomData) return;
    updateRoomIdPass(roomData);
  }, [roomData]);

  const handleSubmit = async () => {
    if (!roomData) return;
    try {
      await assignRoom({
        tournamentId: roomData.tournamentId,
        body: {
          roomId,
          roomPassword,
        },
      }).unwrap();

      toast.success("Room details saved");
      onClose()
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-white/10 bg-[#13192A]">
        <DialogHeader>
          <DialogTitle className="text-white">Assign Room Details</DialogTitle>
          <DialogDescription className="text-white/60">
            Please Assign Room details to set roomId and roomPassword
          </DialogDescription>
        </DialogHeader>
        <Input
          className="text-white"
          placeholder="Room Id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Input
          className="text-white"
          placeholder="Room Password"
          value={roomPassword}
          onChange={(e) => setRoomPassword(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !roomId.trim() || !roomPassword.trim()}
          >
            {isLoading ? "Saving..." : "Save Room"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
