import { User } from "@/types/user";
import { baseApi } from "./baseApi";
import { login, logout, setUser } from "../auth/authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

interface RegisterRequest {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            login({
              user: data.data.user,
              accessToken: data.data.accessToken,
            })
          );
        } catch {}
      },

      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },

      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
    
          dispatch(
            login({
              user: data.data.user,
              accessToken: data.data.accessToken,
            })
          );
        } catch {}
      },
    
      invalidatesTags: ["Auth"],
    }),
    getMe: builder.query<AuthResponse, void>({
      query: () => "/auth/me",

      providesTags: ["Auth"],

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data.data.user))
        } catch {
          dispatch(logout());
        }
      },
    }),

    refresh: builder.mutation<
      {
        accessToken: string;
      },
      void
    >({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshMutation,
  useRegisterMutation
} = authApi;