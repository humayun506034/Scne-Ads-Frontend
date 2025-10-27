import { baseApi } from "@/store/api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
      providesTags: ( id) => [{ type: "Banner", id }],
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
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
} = adminApi;
