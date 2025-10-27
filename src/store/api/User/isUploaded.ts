

import { baseApi } from "../baseApi";


export const uploadCampaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

markCustomCampaignUploaded: builder.mutation<
      { success: boolean; message: string }, // Response type
      string // campaignId
>({
      query: (campaignId) => ({
        url: `/campaign/make-uploaded-content-done-for-custom-campaign/${campaignId}`,
        method: "PATCH", 
      }),
    }),
  }),
});

export const { useMarkCustomCampaignUploadedMutation } = uploadCampaignApi;
