import { DurationOption } from "@/components/Modules/UserDashboard/Dashboard/Stats/StatsSection";
import { baseApi } from "./baseApi";

type Filters = {
  durationFilters: DurationOption;
};

const analyticApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: (filters: Filters) => ({
        url: "/analytics",
        method: "GET",
        params: {
          duration: filters.durationFilters,
        },
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticApi;
