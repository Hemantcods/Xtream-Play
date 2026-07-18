"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  loading?: boolean;
  confirmLabel?: string;
  variant?: "default" | "destructive";
}

export default function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  loading,
  confirmLabel = "Confirm",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="border-white/10 bg-[#13192A]">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-white/60">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={loading}
            className="text-white/60 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            variant={variant === "destructive" ? "destructive" : "default"}
            className={
              variant === "default"
                ? "bg-accent-brand hover:bg-accent-brand/80 text-white"
                : ""
            }
          >
            {loading ? "Processing..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
