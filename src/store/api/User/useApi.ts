import { baseApi } from "@/store/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<
      any, // response type (optional)
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
    }),
    
  }),
});

export const { useGetAllUserQuery } =
  userApi;
