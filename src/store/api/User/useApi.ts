/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<
      any,
      { page?: string; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/user/all-users",
        method: "GET",
        params: {
          page,
          searchTerm,
        },

      }),
    }),
  changePassword: builder.mutation({
      query: (payload) => ({
        url: "/user/all-users",
        method: "POST",
        body: payload,

      }),
    }),

  }),
});

export const { useGetAllUserQuery } =
  userApi;
