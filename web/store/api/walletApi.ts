import { walletBalance } from "@/types/wallet";
import { baseApi } from "./baseApi";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<ApiResponse<walletBalance>, void>({
      query: () => "/wallet",
      providesTags: ["Wallet"],
    }),
  }),
});

export const { useGetWalletQuery } = walletApi;
