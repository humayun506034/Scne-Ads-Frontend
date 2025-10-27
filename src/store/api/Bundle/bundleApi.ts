/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";

const bundleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundle: builder.query<any, 
      { page?: string; searchTerm?: string ,limit?:number}>({
      query: ({ page, searchTerm ,limit}) => ({
        url: "/bundle",
        method: "GET",
         params: {
          page,
          searchTerm,
          limit: Number(limit) || 1000
        },
      }),
      providesTags: ["Bundle"],
    }),
    createBundle : builder.mutation({
      query: (payload) => ({
        url: "/bundle",
        method: "POST",
        body: payload,
    }),
    invalidatesTags: ["Bundle"],

    }),
    UpdateBundle : builder.mutation({
      query: ({payload,id}) => ({
        url: `/bundle/${id}`,
        method: "PATCH",
        body: payload,
    }),
    invalidatesTags: ["Bundle"],
    }),
    deleteBundle : builder.mutation({
      query: (id) => ({
        url: `/bundle/${id}`,
        method: "DELETE",
       
    }),
    invalidatesTags: ["Bundle"],
    }),
  }),
});

export const { useGetAllBundleQuery, useCreateBundleMutation,useUpdateBundleMutation,useDeleteBundleMutation } = bundleApi;
