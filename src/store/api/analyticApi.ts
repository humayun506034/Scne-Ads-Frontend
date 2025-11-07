import { baseApi } from "./baseApi";

const analyticApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticApi;
