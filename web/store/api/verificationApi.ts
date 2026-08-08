import { baseApi } from "./baseApi";

interface verifyEmailRequest {
  email: string;
  otp: string;
}
interface ResendEmailRequest {
  email: string;
}
interface ApiResponse {
  success: boolean;
  message: string;
}
export const VerificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<ApiResponse, verifyEmailRequest>({
      query: (body) => ({
        url: "/verification/verify-email",
        method: "POST",
        body,
      }),
    }),
    resendEmailVerification: builder.mutation<ApiResponse, ResendEmailRequest>({
      query: (body) => ({
        url: "/verification/resend-email",
        method: "POST",
        body,
      }),
    }),
  }),
});


export const {useResendEmailVerificationMutation,useVerifyEmailMutation }=VerificationApi