import {
  JoinTeamDto,
  TeamDetailsResponse,
  UpdateTeamProfileDto,
} from "@/types/team";
import { baseApi } from "./baseApi";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query<ApiResponse<TeamDetailsResponse>, string>({
      query: (tournamentId) => ({
        url: `/team/${tournamentId}/team`,
        method: "GET",
      }),
      providesTags: (_result, _error, tournamentId) => [
        { type: "Team", id: tournamentId },
      ],
    }),
    joinTeam: builder.mutation<
      ApiResponse<void>,
      {
        tournamentId: string;
        body: JoinTeamDto;
      }
    >({
      query: ({ tournamentId, body }) => ({
        url: `/team/${tournamentId}/invite/join`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Tournament", id: tournamentId },
      ],
    }),
    kickMember: builder.mutation<
      ApiResponse<void>,
      {
        tournamentId: string;
        userId: string;
      }
    >({
      query: ({ tournamentId, userId }) => ({
        url: `/team/${tournamentId}/kick/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        {
          type: "Team",
          id: tournamentId,
        },
      ],
    }),
    leaveTeam: builder.mutation<ApiResponse<void>, string>({
      query: (touranmentId) => ({
        url: `/team/${touranmentId}/leave`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, touranmentId) => [
        { type: "Team", id: touranmentId },
      ],
    }),
    updateTeamProfile: builder.mutation<
      ApiResponse<void>,
      {
        tournamentId: string;
        body: UpdateTeamProfileDto;
      }
    >({
      query: ({ tournamentId, body }) => ({
        url: `/team/${tournamentId}/profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Team", id: tournamentId },
      ],
    }),
  }),
});

export const {
  useGetTeamQuery,
  useJoinTeamMutation,
  useKickMemberMutation,
  useLeaveTeamMutation,
  useUpdateTeamProfileMutation,
} = teamApi;
