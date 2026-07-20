import { Game } from "./tournament";

export interface AdminStats {
  totalUsers: number;
  activeTournaments: number;
  upcomingTournaments: number;
  runningTournaments: number;
  completedTournaments: number;
  walletBalance: number;
  revenue: number;
  pendingRegistrations: number;
}

export interface AdminTransaction {
  _id: string;
  userId: string;
  userName: string;
  type: "registration" | "payout" | "refund";
  amount: number;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export interface AdminRegistration {
  _id: string;
  tournamentId: string;
  tournamentName: string;
  userId: string;
  userName: string;
  inGameName: string;
  teamName?: string;
  entryFee: number;
  walletPaid: boolean;
  status: "confirmed" | "pending" | "cancelled";
  joinedAt: string;
}

export type AdminTournamentStatus =
  | "upcoming"
  | "running"
  | "completed"
  | "cancelled";

export interface AdminTournament {
  _id: string;
  name: string;
  description?: string;
  game: string;
  mode: {
    map: string;
    player: "solo" | "duo" | "squad";
    type: string;
  };
  PlacementPrize?: {
    first?: number,
    second?: number,
    third?:number
  };
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  registeredPlayers: number;
  status: AdminTournamentStatus;
  registrationEndsAt: string;
  StartTime: string;
  roomId?: string;
  roomPassword?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTournamentListResponse {
  tournaments: AdminTournament[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface AdminParticipant {
  _id: string;
  userId: string;
  inGameName: string;
  uid: string;
  teamName?: string;
  joinedAt: string;
  entryFee: number;
  walletPaid: boolean;
  status: "confirmed" | "pending" | "disqualified";
}

export interface AdminTeam {
  _id: string;
  name: string;
  captain: {
    id: string;
    name: string;
  };
  members: {
    id: string;
    name: string;
  }[];
  points: number;
  status: "active" | "disqualified";
  registeredAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamId: string;
  teamName: string;
  kills: number;
  placement: number;
  points: number;
  prize: number;
}

export interface AdminWalletStats {
  totalRevenue: number;
  pendingWithdrawals: number;
  completedWithdrawals: number;
  tournamentEntryRevenue: number;
  prizePoolDistributed: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "admin" | "user" | "moderator";
  totalTournaments: number;
  totalEarnings: number;
  createdAt: string;
}

export interface CreateTournamentDto {
  name: string;
  game: Game;

  mode: {
    map: string;
    player: "solo" | "duo" | "squad";
    type: string;
  };

  entryFee: number;
  prizePool: number;
  maxPlayers: number;

  StartTime: string;

  PlacementPrize: {
    first: number;
    second: number;
    third: number;
  };

  PerEliminationPrize?: number;
}