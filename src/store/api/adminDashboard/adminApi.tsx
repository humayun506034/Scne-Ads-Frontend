import { baseApi } from "@/store/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
    }),
    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
    }),
    createBanner: builder.mutation({
      query: (payload) => ({
        url: "/banner",
        method: "POST",
        body: payload,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllBannerQuery, useCreateBannerMutation } = adminApi;
