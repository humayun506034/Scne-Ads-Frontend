/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/api/adminDashboard/adminApi.ts
import { baseApi } from "@/store/api/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---- existing banners ----
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    getSingleBanner: builder.query({
      query: (id: string) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Banner", id }],
    }),

    createBanner: builder.mutation({
      query: (payload) => ({
        url: "/banner",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Banner"],
    }),

    deleteBanner: builder.mutation({
      query: (id: string) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),

    // ---- Admins ----
    getAllAdmins: builder.query({
      query: () => ({
        url: "/user/all-admins",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),

    // ---- Chat list (with limit + cursor) ----
    getAllChatLists: builder.query<
      { items: any[]; nextCursor: string | null },
      { limit?: number; cursor?: string | null }
    >({
      query: ({ limit = 20, cursor = null }) => {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        if (cursor) params.set("cursor", cursor);
        return {
          url: `/chat/getLists?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["ChatLists"],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
  useGetAllAdminsQuery,
  useGetAllChatListsQuery,
} = adminApi;
