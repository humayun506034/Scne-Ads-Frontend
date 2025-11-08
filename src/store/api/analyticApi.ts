import { baseApi } from "./baseApi";

export const analyticApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerCustoms: builder.query({
      query: () => {
        return {
          url: "campaign/myself-all-custom-campaign",
          method: "GET",
        };
      },
    }),
    getCustomerBundles: builder.query({
      query: () => {
        return {
          url: "campaign/myself-all-bundle-campaign",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCustomerCustomsQuery, useGetCustomerBundlesQuery } =
  analyticApi;
