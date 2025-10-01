import { baseApi } from "@/store/api/baseApi";

const bundleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundle: builder.query<any, // response type (optional)
      { page?: string; searchTerm?: string }>({
      query: ({ page, searchTerm }) => ({
        url: "/bundle",
        method: "GET",
         params: {
          page,
          searchTerm,
          // limit:"1"
        },
      }),
    }),
  }),
});

export const { useGetAllBundleQuery } = bundleApi;
