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
        // headers: {
        //   Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NDQ1ZjI4LTllZTUtNGFlOC04ZDNkLTlmZTRkZDg1MTYyNCIsImVtYWlsIjoiYWRtaW5Ac2NuZV9hZHMuY29tIiwiZmlyc3RfbmFtZSI6Ik1yLiIsImxhc3RfbmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwib3JnYW5pc2F0aW9uX3JvbGUiOiJhZHZlcnRpc2VyIiwib3JnYW5pc2F0aW9uX25hbWUiOiJTQ05FIEFkcyIsInBob25lIjoiKzg4MDE3MTIzNDU2NzgiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc192ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzU4MTcyMzUzLCJleHAiOjE3NTk0NjgzNTN9.ffnnT1X6tL8sKiAA748rsAF5UrPjqInu5Fvv9RWS374`,
        // },
      }),
    }),
    
  }),
});

export const { useGetAllScreenQuery } =
  screenApi;
