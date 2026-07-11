import { Tournament } from "@/types/tournament";
import { baseApi } from "./baseApi";
export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTournament: builder.mutation<
      { success: boolean; data: Tournament },
      Omit<Tournament, "_id" | "createdAt" | "updatedAt">
    >({
      query: (body) => ({
        url: "/tournaments/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tournament"],
    }),

    getTournament: builder.query<
      { success: boolean; data: Tournament },
      string
    >({
      query: (id) => `/tournaments/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Tournament", id }],
    }),
  }),
});

export const { useCreateTournamentMutation, useGetTournamentQuery } =
  tournamentApi;
