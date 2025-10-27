/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";

export const screenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScreen: builder.query<
      any,
      { page?: string; searchTerm?: string; limit?: number }
    >({
      query: ({ page, searchTerm, limit }) => {
        const params: Record<string, any> = {};
        if (page) params.page = page;
        if (searchTerm) params.searchTerm = searchTerm;
        params.limit = limit || 1000;

        return {
          url: "/screen",
          method: "GET",
          params,
        };
      },
      providesTags: ["Screen"],
    }),

    getTopSalesScreen: builder.query({
      query: () => ({
        url: "/screen/top-sales-screen",
        method: "GET",
      }),
      providesTags: ["Screen"],
    }),

    getNewArrivalScreens: builder.query({
      query: () => ({
        url: "/screen/new-arrivals-screen",
        method: "GET",
      }),
      providesTags: ["Screen"],
    }),

    getMySelfFavouriteScreens: builder.query({
      query: ({ limit, page }) => ({
        url: "/screen/myself-favourite-screen",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: ["Screen"],
    }),

    deleteScreen: builder.mutation<any, number>({
      query: (id) => ({
        url: `/screen/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Screen"],
    }),

    changeScreenStatus: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/screen/change-availability-status/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Screen"],
    }),

    createScreen: builder.mutation({
      query: (payload) => ({
        url: `/screen`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Screen"],
    }),

    uploadScreenImages: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/screen/add-screen-images/${id}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Screen"],
    }),

    updateScreen: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/screen/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Screen"],
    }),

    deleteScreenImage: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/screen/delete-single-image/${id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Screen"],
    }),

    // -------------------------
    // Add favourite mutation
    addFavouriteScreen: builder.mutation<any, { screenId: string }>({
      query: ({ screenId }) => ({
        url: "/screen/add-favourite-screen",
        method: "POST",
        body: { screenId }, // only screenId, no userId
      }),
      invalidatesTags: ["Screen"],
    }),
    // -------------------------
  }),
});

export const {
  useGetAllScreenQuery,
  useGetMySelfFavouriteScreensQuery,
  useGetTopSalesScreenQuery,
  useGetNewArrivalScreensQuery,
  useCreateScreenMutation,
  useDeleteScreenMutation,
  useUpdateScreenMutation,
  useUploadScreenImagesMutation,
  useDeleteScreenImageMutation,
  useChangeScreenStatusMutation,
  useAddFavouriteScreenMutation,
} = screenApi;
