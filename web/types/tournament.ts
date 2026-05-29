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
  isCompleted?: boolean;
  roomId?: string;
  roomPassword?: string;
  createdAt?: string;
  updatedAt?: string;
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
}

export interface TournamentUpdateData extends Partial<TournamentCreateData> {}

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