import { Tournament } from "@/types/tournament";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

interface TournamentResponse {
  success: boolean;
  data?: Tournament | Tournament[];
  message?: string;
}

interface TournamentStatusResponse {
  success: boolean;
  status: "upcoming" | "ongoing" | "completed";
}

interface ParticipantResponse {
  success: boolean;
  data: any[]; // Adjust based on actual participant data structure
}

/**
 * Get all tournaments
 */
export const getAllTournaments = async (): Promise<Tournament[]> => {
  const response = await fetch(`${API_BASE_URL}/tournaments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tournaments: ${response.statusText}`);
  }

  const data: TournamentResponse = await response.json();
  return (data.data as Tournament[]) || [];
};

/**
 * Get tournament by ID
 */
export const getTournamentById = async (id: string): Promise<Tournament> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tournament: ${response.statusText}`);
  }

  const data: TournamentResponse = await response.json();
  return data.data as Tournament;
};

/**
 * Create tournament (Admin only)
 */
export const createTournament = async (
  tournamentData: Omit<Tournament, "_id" | "createdAt" | "updatedAt">,
  accessToken: string,
): Promise<Tournament> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(tournamentData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create tournament: ${response.statusText}`);
  }

  const data: TournamentResponse = await response.json();
  return data.data as Tournament;
};

/**
 * Update tournament (Admin only)
 */
export const updateTournament = async (
  id: string,
  tournamentData: Partial<Tournament>,
  accessToken: string,
): Promise<Tournament> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(tournamentData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update tournament: ${response.statusText}`);
  }

  const data: TournamentResponse = await response.json();
  return data.data as Tournament;
};

/**
 * Delete tournament (Admin only)
 */
export const deleteTournament = async (
  id: string,
  accessToken: string,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete tournament: ${response.statusText}`);
  }
};

/**
 * Start tournament (Admin only)
 */
export const startTournament = async (
  id: string,
  roomData: { roomId: string; roomPassword: string },
  accessToken: string,
): Promise<Tournament> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/start/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(roomData),
  });

  if (!response.ok) {
    throw new Error(`Failed to start tournament: ${response.statusText}`);
  }

  const data: TournamentResponse = await response.json();
  return data.data as Tournament;
};

/**
 * End tournament (Admin only)
 */
export const endTournament = async (
  id: string,
  accessToken: string,
): Promise<Tournament> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/end/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to end tournament: ${response.statusText}`);
  }

  const data: TournamentResponse = await response.json();
  return data.data as Tournament;
};

/**
 * Get tournament status
 */
export const getTournamentStatus = async (
  id: string,
): Promise<"upcoming" | "ongoing" | "completed"> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/status/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tournament status: ${response.statusText}`,
    );
  }

  const data: TournamentStatusResponse = await response.json();
  return data.status as "upcoming" | "ongoing" | "completed";
};

/**
 * Join tournament (User only)
 */
export const joinTournament = async (
  id: string,
  accessToken: string,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/participants/${id}/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to join tournament: ${response.statusText}`);
  }
};

/**
 * Leave tournament (User only)
 */
export const leaveTournament = async (
  id: string,
  accessToken: string,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/participants/${id}/leave`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to leave tournament: ${response.statusText}`);
  }
};

/**
 * Get tournament participants
 */
export const getTournamentParticipants = async (id: string): Promise<any[]> => {
  const response = await fetch(
    `${API_BASE_URL}/participants/${id}/participants`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tournament participants: ${response.statusText}`,
    );
  }

  const data: ParticipantResponse = await response.json();
  return data.data;
};

/**
 * Get tournaments joined by the current user
 */
export const getUserTournaments = async (
  accessToken: string,
): Promise<Tournament[]> => {
  const response = await fetch(`${API_BASE_URL}/tournaments/joined`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user tournaments: ${response.statusText}`);
  }
  const data: TournamentResponse = await response.json();
  if (!data.data || (Array.isArray(data.data) && data.data.length === 0)) {
    return [] as Tournament[];
  }
  return data.data as Tournament[];
};
