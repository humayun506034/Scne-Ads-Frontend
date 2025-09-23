import { baseApi } from "@/store/api/baseApi";

const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundleCampaign: builder.query<
      any, // response type (optional)
      { page: string; searchTerm: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/get-all-bundle-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
        },
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NDQ1ZjI4LTllZTUtNGFlOC04ZDNkLTlmZTRkZDg1MTYyNCIsImVtYWlsIjoiYWRtaW5Ac2NuZV9hZHMuY29tIiwiZmlyc3RfbmFtZSI6Ik1yLiIsImxhc3RfbmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwib3JnYW5pc2F0aW9uX3JvbGUiOiJhZHZlcnRpc2VyIiwib3JnYW5pc2F0aW9uX25hbWUiOiJTQ05FIEFkcyIsInBob25lIjoiKzg4MDE3MTIzNDU2NzgiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc192ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzU4MTcyMzUzLCJleHAiOjE3NTk0NjgzNTN9.ffnnT1X6tL8sKiAA748rsAF5UrPjqInu5Fvv9RWS374`,
        },
      }),
    }),
    getAllCustomCampaign: builder.query<
      any, // response type (optional)
      { page: string; searchTerm: string }
    >({
      query: ({ page, searchTerm }) => ({
        url: "/campaign/get-all-custom-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
        },
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NDQ1ZjI4LTllZTUtNGFlOC04ZDNkLTlmZTRkZDg1MTYyNCIsImVtYWlsIjoiYWRtaW5Ac2NuZV9hZHMuY29tIiwiZmlyc3RfbmFtZSI6Ik1yLiIsImxhc3RfbmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwib3JnYW5pc2F0aW9uX3JvbGUiOiJhZHZlcnRpc2VyIiwib3JnYW5pc2F0aW9uX25hbWUiOiJTQ05FIEFkcyIsInBob25lIjoiKzg4MDE3MTIzNDU2NzgiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc192ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzU4MTcyMzUzLCJleHAiOjE3NTk0NjgzNTN9.ffnnT1X6tL8sKiAA748rsAF5UrPjqInu5Fvv9RWS374`,
        },
      }),
    }),
  }),
});

export const { useGetAllBundleCampaignQuery, useGetAllCustomCampaignQuery } =
  campaignsApi;
