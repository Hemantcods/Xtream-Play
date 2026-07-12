export interface Tournament {
  _id: string;
  name: string;
  game: "freefire" | "bgmi" | "cod" | "other";
  entryFee: number;
  prizePool: number;
  mode: {
    map: string;
    player: "solo" | "duo" | "squad";
    type: string;
  };
  StartTime: string; // ISO date string
  maxPlayers: number;
  PlacementPrize?: {
    first: number;
    second: number;
    third: number;
  };
  PerElimination: number;
  isCompleted?: boolean;
  roomId?: string;
  roomPassword?: string;
  createdAt?: string;
  updatedAt?: string;
  registeredPlayers: number;
  isRegistered?: boolean;
}

export interface TournamentCreateData {
  name: string;
  game: "freefire" | "bgmi" | "cod" | "other";
  entryFee: number;
  prizePool: number;
  mode: {
    map: string;
    player: "solo" | "duo" | "squad";
    type: string;
  };
  StartTime: string; // ISO date string
  maxPlayers: number;
  PlacementPrize?: {
    first: number;
    second: number;
    third: number;
  };
  PerElimination?: number;
}

// export interface TournamentUpdateData extends Partial<TournamentCreateData> {}

export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    role: "admin" | "user" | "moderator";
  };
  accessToken: string;
  refreshToken: string;
}

export interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface TournamentStatusResponse {
  success: boolean;
  status: "upcoming" | "ongoing" | "completed";
}

export interface Participant {
  id: string;
  userId: string;
  tournamentId: string;
  joinedAt: string;
  // Add other participant fields as needed
}

export interface RoomData {
  roomId: string;
  roomPassword: string;
}

export type TournamentStatus = "upcoming" | "live" | "completed";

export interface TournamentTeam {
  id: string;
  name: string;
  logo?: string;
  rank: number;
  points: number;
}

export interface MyTournamentCard {
  _id: string;
  name: string;
  game: string;
  mode: {
    map?: string,
    player?:string,
    type?:string
  }
  teamType: string;
  status: TournamentStatus;
  bannerImage?: string;
  startTime: string;
  entryFee: number;
  prizePool: number;
  registeredTeams: number;
  maxPlayers: number;
  tags: { game: string; mode: string; state: string };
  room: {
    roomId?: string,
    password?:string,
  },
  round?: string;
  currentMap?: string;
  teams?: TournamentTeam[];
  registrationConfirmed?: boolean;
}

export interface TournamentStats {
  total: number;
  upcoming: number;
  live: number;
  completed: number;
  totalWins: number;
  totalEarnings: number;
}

export interface UpcomingMatch {
  id: string;
  tournamentTitle: string;
  game: string;
  startDate: string;
  gameIcon?: string;
}

export interface Note {
  id: string;
  text: string;
}

export type TeamStatus = "confirmed" | "pending" | "qualified";

export interface RegisteredTeam {
  id: string;
  teamName: string;
  totalPoints: number;
  status: TeamStatus;
  registeredAt: string;
}

export interface TournamentSummary {
  id: string;
  title: string;
  bannerImage: string;
  game: string;
  mode: string;
  status: TournamentStatus;
  registeredTeams: number;
  maxTeams: number;
  prizePool: number;
  entryFee: number;
  registrationEndsAt: string;
}
