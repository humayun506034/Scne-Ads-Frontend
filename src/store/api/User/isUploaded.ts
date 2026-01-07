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

    markBundleCampaignUploaded: builder.mutation<
      { success: boolean; message: string },
      string // campaignId
    >({
      query: (campaignId) => ({
        url: `/campaign/make-uploaded-content-done-for-bundle-campaign/${campaignId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useMarkCustomCampaignUploadedMutation,
  useMarkBundleCampaignUploadedMutation,
} = uploadCampaignApi;
