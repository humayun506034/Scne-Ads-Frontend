


import { baseApi } from "@/store/api/baseApi";

const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundleCampaign: builder.query<any,{ page?: string; searchTerm?: string }>({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/get-all-bundle-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
        },

      }),
    }),
    getAllCustomCampaign: builder.query<any,{ page?: string; searchTerm?: string }>({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/get-all-custom-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
        },

      }),
    }),

     getMyselfAllBundleCampaign: builder.query<any,{ page?: string; searchTerm?: string }>({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/myself-all-bundle-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
        },

      }),
    }),
  }),
});

export const { useGetAllBundleCampaignQuery, useGetAllCustomCampaignQuery, useGetMyselfAllBundleCampaignQuery } =
  campaignsApi;