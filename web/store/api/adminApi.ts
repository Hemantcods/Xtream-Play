import type {
  AdminStats,
  AdminTransaction,
  AdminRegistration,
  AdminTournament,
  AdminParticipant,
  AdminTeam,
  LeaderboardEntry,
  AdminUser,
  AdminTournamentListResponse,
  CreateTournamentDto,
  TeamResult,
  TeamTournamentSummary,
  TeamAdmin,
} from "@/types/admin";
import { baseApi } from "./baseApi";
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<{ success: boolean; data: AdminStats }, void>({
      query: () => "/admin/stats",
      providesTags: ["Admin"],
    }),

    getTransactions: builder.query<
      { success: boolean; data: AdminTransaction[] },
      void
    >({
      query: () => "/admin/transactions",
      providesTags: ["Admin"],
    }),

    getRegistrations: builder.query<
      { success: boolean; data: AdminRegistration[] },
      void
    >({
      query: () => "/admin/registrations",
      providesTags: ["Admin"],
    }),

    getAdminTournaments: builder.query<
      { success: boolean; data: AdminTournamentListResponse },
      void
    >({
      query: () => "/tournaments/admin/list",
      providesTags: ["Admin"],
    }),

    getAdminTournament: builder.query<
      { success: boolean; data: AdminTournament },
      string
    >({
      query: (id) => `/tournaments/admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Admin", id }],
    }),

    createAdminTournament: builder.mutation<
      { success: boolean; data: AdminTournament; message: string },
      CreateTournamentDto
    >({
      query: (body) => ({
        url: "/tournaments/admin/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    updateAdminTournament: builder.mutation<
      { success: boolean; data: AdminTournament },
      { id: string; body: Partial<AdminTournament> }
    >({
      query: ({ id, body }) => ({
        url: `/tournaments/admin/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Admin", id },
        "Admin",
      ],
    }),

    deleteAdminTournament: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/tournaments/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    startTournament: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/admin/tournaments/${id}/start`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Admin", id },
        "Admin",
      ],
    }),
    assignRoom: builder.mutation<
      ApiResponse<void>,
      {
        tournamentId: string;
        body: {
          roomId: string;
          roomPassword: string;
        };
      }
    >({
      query: ({ tournamentId, body }) => ({
        url: `tournaments/admin/assign/${tournamentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Tournament", id: tournamentId },
        {type:"Admin",id:tournamentId}
      ],
    }),

    getAdminParticipants: builder.query<
      { success: boolean; data: AdminParticipant[] },
      string
    >({
      query: (tournamentId) =>
        `/admin/tournaments/${tournamentId}/participants`,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Admin", id: tournamentId },
      ],
    }),

    getAdminTeams: builder.query<
      ApiResponse<{
        summary: TeamTournamentSummary,
        teams:TeamAdmin[]
      }>,
      string
    >({
      query: (tournamentId) => `participants/admin/${tournamentId}/teams`,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Tournament", id: tournamentId },
      ],
    }),

    getAdminLeaderboard: builder.query<
      { success: boolean; data: LeaderboardEntry[] },
      string
    >({
      query: (tournamentId) => `/admin/tournaments/${tournamentId}/leaderboard`,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Admin", id: tournamentId },
      ],
    }),

    updateLeaderboard: builder.mutation<
      { success: boolean; data: LeaderboardEntry[] },
      { tournamentId: string; entries: Partial<LeaderboardEntry>[] }
    >({
      query: ({ tournamentId, entries }) => ({
        url: `/admin/tournaments/${tournamentId}/leaderboard`,
        method: "PUT",
        body: { entries },
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Admin", id: tournamentId },
        "Admin",
      ],
    }),

    disqualifyTeam: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (teamId) => ({
        url: `/admin/teams/${teamId}/disqualify`,
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),

    deleteTeam: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (teamId) => ({
          url: `/admin/teams/${teamId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Admin"],
      },
    ),

    draftResults: builder.mutation<
      { success: boolean; message: string },
      { tournamentId: string; results: TeamResult[] }
    >({
      query: ({ tournamentId, results }) => ({
        url: `/tournaments/admin/${tournamentId}/result`,
        method: "PATCH",
        body: { results },
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Admin", id: tournamentId },
        "Admin",
      ],
    }),

    publishResults: builder.mutation<
      { success: boolean; message: string },
      { tournamentId: string; results: TeamResult[] }
    >({
      query: ({ tournamentId, results }) => ({
        url: `/tournaments/admin/${tournamentId}/result/publish`,
        method: "POST",
        body: { results },
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Admin", id: tournamentId },
        "Admin",
      ],
    }),

    getAdminUsers: builder.query<{ success: boolean; data: AdminUser[] }, void>(
      {
        query: () => "/admin/users",
        providesTags: ["Admin"],
      },
    ),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetTransactionsQuery,
  useGetRegistrationsQuery,
  useGetAdminTournamentsQuery,
  useGetAdminTournamentQuery,
  useCreateAdminTournamentMutation,
  useUpdateAdminTournamentMutation,
  useDeleteAdminTournamentMutation,
  useStartTournamentMutation,
  useAssignRoomMutation,
  useGetAdminParticipantsQuery,
  useGetAdminTeamsQuery,
  useGetAdminLeaderboardQuery,
  useUpdateLeaderboardMutation,
  useDisqualifyTeamMutation,
  useDeleteTeamMutation,
  useDraftResultsMutation,
  usePublishResultsMutation,
  useGetAdminUsersQuery,
} = adminApi;
