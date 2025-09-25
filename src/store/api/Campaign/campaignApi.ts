import { baseApi } from "@/store/api/baseApi";

const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundleCampaign: builder.query<
      any,
      { page?: string; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/get-all-bundle-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          // limit:"1"
        },
      }),
    }),
    getAllCustomCampaign: builder.query<
      any,
      { page?: string; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/get-all-custom-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          // limit:"1"
        },
      }),
    }),

    getMyselfAllBundleCampaign: builder.query<
      any,
      { page?: string; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/myself-all-bundle-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          // limit:"1"
        },
      }),
    }),
    getMyselfAllCustomCampaign: builder.query<
      any,
      { page?: string; searchTerm?: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/myself-all-custom-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          // limit: "1",
        },
      }),
    }),
  }),
});

export const {
  useGetAllBundleCampaignQuery,
  useGetAllCustomCampaignQuery,
  useGetMyselfAllBundleCampaignQuery,
  useGetMyselfAllCustomCampaignQuery,
} = campaignsApi;
