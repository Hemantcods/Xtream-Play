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

export const participantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    joinTournament: builder.mutation<
      ApiResponse,
      JoinTournamentRequest
    >({
      query: ({ tournamentId, ...body }) => ({
        url: `/participants/${tournamentId}/join`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Tournament", id: tournamentId },
      ],
    })
  })
})


export const {useJoinTournamentMutation}=participantApi