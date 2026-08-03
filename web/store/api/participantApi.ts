import { RegisteredTeam, TournamentSummary } from "@/types/tournament";
import { baseApi } from "./baseApi";

interface JoinTournamentRequest {
  tournamentId: string;
  uid: string;
  inGameName: string;
  teamName?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface GetRegisteredResponse {
  success: boolean;
  data: {
    summary: TournamentSummary;
    teams: RegisteredTeam[];
  };
}

export const participantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinTournament: builder.mutation<ApiResponse, JoinTournamentRequest>({
      query: ({ tournamentId, ...body }) => ({
        url: `/participants/${tournamentId}/join`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Tournament", id: tournamentId },
        "Wallet"
      ],
    }),
    getRegisteredTeams: builder.query<GetRegisteredResponse, string>({
      query: (tournamentId) => ({
        url: `/participants/${tournamentId}/teams`,
      }),
      providesTags: (result, error, tournamentId) => [
        { type: "Tournament", id: tournamentId },
      ],
    }),
  }),
});

export const { useJoinTournamentMutation, useGetRegisteredTeamsQuery } =
  participantApi;
