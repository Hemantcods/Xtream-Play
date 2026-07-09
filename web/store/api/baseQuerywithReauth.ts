import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { logout, setAccessToken } from "../auth/authSlice"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
import { FetchArgs } from "@reduxjs/toolkit/query"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

const baseQuery=fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
})
const baseQueryWithReauth: BaseQueryFn<string|FetchArgs,unknown,FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery({
      url: '/auth/refresh-token',
      method: "POST",
      credentials:'include'
    },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      api.dispatch(setAccessToken((refreshResult.data as { accessToken: string }).accessToken))
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export {baseQueryWithReauth}