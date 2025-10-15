/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";

const screenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScreen: builder.query<
      any, // response type (optional)
      { page?: string; searchTerm?: string,limit?:number }
    >({
      query: ({ page, searchTerm ,limit}) => ({
        url: "/screen",
        method: "GET",
        params: {
          page,
          searchTerm,
          limit:Number(limit) || 1000
        },
      }),
      providesTags:['Screen']
    }),

    getTopSalesScreen: builder.query<any, void>({
      query: () => "/screen/top-sales-screen",
    }),

    getMySelfFavouriteScreens: builder.query<any, void>({
      query: () => "/screen/myself-favourite-screen",
    }),

    deleteScreen: builder.mutation<any, number>({
      query: (id) => ({
        url: `/screen/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['Screen']
    })
  }),
});

export const {
  useGetAllScreenQuery,
  useGetMySelfFavouriteScreensQuery,
  useGetTopSalesScreenQuery,
  useDeleteScreenMutation
} = screenApi;
