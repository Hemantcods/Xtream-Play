"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AdminTournament } from "@/types/admin";

export interface TournamentFormData {
  name: string;
  game: string;
  mode: {
    map: string;
    player: "solo" | "duo" | "squad";
    type: string;
  };
  PerEliminationPrize: number;
  PlacementPrize?: {
    first?: number;
    second?: number;
    third?: number;
  };
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  registrationEndsAt: string;
  StartTime: string;
}

interface TournamentFormProps {
  initialValues?: Partial<AdminTournament>;
  onSubmit: (data: TournamentFormData) => void;
  loading?: boolean;
}

const defaultValues: TournamentFormData = {
  name: "",
  game: "freefire",
  mode: { map: "", player: "squad", type: "Battle Royale" },
  PerEliminationPrize: 0,
  PlacementPrize: { first: 0, second: 0, third: 0 },
  entryFee: 0,
  prizePool: 0,
  maxPlayers: 64,
  registrationEndsAt: "",
  StartTime: "",
};

function toLocalDatetime(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TournamentForm({
  initialValues,
  onSubmit,
  loading,
}: TournamentFormProps) {
  const isEdit = !!initialValues;
  const [form, setForm] = useState<TournamentFormData>(() => {
    if (!initialValues) return defaultValues;
    return {
      name: initialValues.name ?? "",
      game: initialValues.game ?? "freefire",
      mode: {
        map: initialValues.mode?.map ?? "",
        player: initialValues.mode?.player ?? "squad",
        type: initialValues.mode?.type ?? "Battle Royale",
      },
      PerEliminationPrize: 0,
      PlacementPrize: initialValues.PlacementPrize ?? {
        first: 0,
        second: 0,
        third:0,
      },
      entryFee: initialValues.entryFee ?? 0,
      prizePool: initialValues.prizePool ?? 0,
      maxPlayers: initialValues.maxPlayers ?? 64,
      registrationEndsAt: toLocalDatetime(initialValues.registrationEndsAt ?? ""),
      StartTime: toLocalDatetime(initialValues.StartTime ?? ""),
    };
  });
  const update = <K extends keyof TournamentFormData>(
    key: K,
    value: TournamentFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="name">Tournament Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter tournament name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="game">Game</Label>
            <Select
              value={form.game}
              onValueChange={(v) => update("game", v)}
            >
              <SelectTrigger id="game">
                <SelectValue placeholder="Select game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freefire">FreeFire</SelectItem>
                <SelectItem value="bgmi">BGMI</SelectItem>
                <SelectItem value="cod">COD Mobile</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Game Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Game Mode</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="playerMode">Player Mode</Label>
            <Select
              value={form.mode.player}
              onValueChange={(v) =>
                update("mode", {
                  ...form.mode,
                  player: v as "solo" | "duo" | "squad",
                })
              }
            >
              <SelectTrigger id="playerMode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo</SelectItem>
                <SelectItem value="duo">Duo</SelectItem>
                <SelectItem value="squad">Squad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="map">Map</Label>
            <Input
              id="map"
              value={form.mode.map}
              onChange={(e) =>
                update("mode", { ...form.mode, map: e.target.value })
              }
              placeholder="e.g. Erangel"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              value={form.mode.type}
              onChange={(e) =>
                update("mode", { ...form.mode, type: e.target.value })
              }
              placeholder="e.g. Battle Royale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Entry & Prize */}
      <Card>
        <CardHeader>
          <CardTitle>Entry &amp; Prize</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="entryFee">Entry Fee (₹)</Label>
            <Input
              id="entryFee"
              type="number"
              min={0}
              value={form.entryFee}
              onChange={(e) =>
                update("entryFee", parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prizePool">Prize Pool (₹)</Label>
            <Input
              id="prizePool"
              type="number"
              min={0}
              value={form.prizePool}
              onChange={(e) =>
                update("prizePool", parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="maxPlayers">Max Players</Label>
            <Input
              id="maxPlayers"
              type="number"
              min={1}
              value={form.maxPlayers}
              onChange={(e) =>
                update("maxPlayers", parseInt(e.target.value) || 1)
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="perElimination">Per Elimination Prize (₹)</Label>
            <Input
              id="perElimination"
              type="number"
              min={0}
              value={form.PerEliminationPrize}
              onChange={(e) =>
                update(
                  "PerEliminationPrize",
                  parseInt(e.target.value) || 0,
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Placement Prize */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Prize</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstPlace">1st Place (₹)</Label>
            <Input
              id="firstPlace"
              type="number"
              min={0}
              value={form.PlacementPrize?.first ?? 0}
              onChange={(e) =>
                update("PlacementPrize", {
                  ...form.PlacementPrize,
                  first: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="secondPlace">2nd Place (₹)</Label>
            <Input
              id="secondPlace"
              type="number"
              min={0}
              value={form.PlacementPrize?.second ?? 0}
              onChange={(e) =>
                update("PlacementPrize", {
                  ...form.PlacementPrize,
                  second: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="thirdPlace">3rd Place (₹)</Label>
            <Input
              id="thirdPlace"
              type="number"
              min={0}
              value={form.PlacementPrize?.third ?? 0}
              onChange={(e) =>
                update("PlacementPrize", {
                  ...form.PlacementPrize,
                  third: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="StartTime">Start Time</Label>
            <Input
              id="StartTime"
              type="datetime-local"
              value={form.StartTime}
              onChange={(e) => update("StartTime", e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-accent-brand hover:bg-accent-brand/80 text-white"
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Tournament"
              : "Create Tournament"}
        </Button>
      </div>
    </form>
  );
}
