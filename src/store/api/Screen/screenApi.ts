import { baseApi } from "@/store/api/baseApi";

const screenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScreen: builder.query<
      any, // response type (optional)
      { page?: string; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/screen",
        method: "GET",
        params: {
          page,
          searchTerm,
        },
      }),
    }),
  }),
});

export const { useGetAllScreenQuery } = screenApi;
