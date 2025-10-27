import { baseApi } from "../baseApi";


export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getMyAllBundleCampaigns: builder.query({
      query: () => "/campaign/myself-all-bundle-campaign",
     
    }),
  }),
});

export const { useGetMyAllBundleCampaignsQuery } = campaignApi;
