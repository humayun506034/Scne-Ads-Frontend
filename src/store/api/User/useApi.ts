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
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: ({ }) => ({
        url: "/user/me",
        method: "GET"

      }),
      providesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,

      }),
      invalidatesTags: ["User"]
    }),

    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: payload,

      }),
      invalidatesTags: ["User"]
    }),

  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery, useChangePasswordMutation, useUpdateProfileMutation } =
  userApi;
