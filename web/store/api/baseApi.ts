import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuerywithReauth";

export const baseApi = createApi({
  reducerPath:'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth'
  ],
  endpoints:()=>({})
})