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
    }),
    changeScreenStatus: builder.mutation({
      query: ({payload,id}) => ({
        url: `/screen/change-availability-status/${id}`,
        method: "PATCH",
        body:payload
      }),
      invalidatesTags:['Screen']
    }),


    createScreen: builder.mutation({
      query: (payload) => ({
        url: `/screen`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags:['Screen']
    }),
    uploadScreenImages: builder.mutation({
      query: ({payload,id}) => ({
        url: `screen/add-screen-images/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags:['Screen']
    }),

    updateScreen: builder.mutation({
      query: ({payload,id}) => ({
        url: `/screen/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags:['Screen']
    }),
    deleteScreenImage: builder.mutation({
      query: ({payload,id}) => ({
        url: `/screen/delete-single-image/${id}`,
        method: "DELETE",
        body: payload,
       
      }),
      invalidatesTags:['Screen']
    }),
  }),
});

export const {
  useGetAllScreenQuery,
  useGetMySelfFavouriteScreensQuery,
  useGetTopSalesScreenQuery,
  useCreateScreenMutation,
  useDeleteScreenMutation,
  useUpdateScreenMutation,
  useUploadScreenImagesMutation,
  useDeleteScreenImageMutation,
  useChangeScreenStatusMutation
} = screenApi;
