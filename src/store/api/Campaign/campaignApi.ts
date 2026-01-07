/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/store/api/baseApi";
interface PublishCampaignBody {
  name: string;
  screenIds: string[];
  startDate: string;
  endDate: string;
  type: string;
  files: File[];
}

interface PublishCampaignResponse {
  success: boolean;
  message: string;
  data?: any;
}

const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBundleCampaign: builder.query<
      any,
      {
        page?: string;
        searchTerm?: string;
        startDate?: string;
        endDate?: string;
        dateFilter?: string;
      }
    >({
      query: ({ page, searchTerm, startDate, endDate, dateFilter }) => ({
        url: "/campaign/get-all-bundle-campaign",
        method: "GET",
        params: {
           page,
          searchTerm,
          startDate,
          endDate,
          dateFilter,
          // limit:"1"
        },
      }),
    }),
    getAllCustomCampaign: builder.query<
      any,
       {
        page?: string;
        searchTerm?: string;
        startDate?: string;
        endDate?: string;
        dateFilter?: string;
      }
    >({
      query: ({ page, searchTerm, startDate, endDate, dateFilter }) => ({
        url: "/campaign/get-all-custom-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          startDate,
          endDate,
          dateFilter,
          // limit:"1"
        },
      }),
    }),

    getMyselfAllBundleCampaign: builder.query<
      any,
      {
        page?: string;
        searchTerm?: string;
        startDate?: string;
        endDate?: string;
        dateFilter?: string;
      }
    >({
      query: ({ page, searchTerm, startDate, endDate, dateFilter }) => ({
        url: "/campaign/myself-all-bundle-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          startDate,
          endDate,
          dateFilter,
          // limit:"1"
        },
      }),
    }),
    getMyselfAllCustomCampaign: builder.query<
      any,
       {
        page?: string;
        searchTerm?: string;
        startDate?: string;
        endDate?: string;
        dateFilter?: string;
      }
    >({
      query: ({ page, searchTerm, startDate, endDate, dateFilter }) => ({
        url: "/campaign/myself-all-custom-campaign",
        method: "GET",
        params: {
          page,
          searchTerm,
          startDate,
          endDate,
          dateFilter,
          // limit: "1",
        },
      }),
    }),

    publishCampaign: builder.mutation<PublishCampaignResponse, PublishCampaignBody>({
      query: ({ name, screenIds, startDate, endDate, type, files }) => {
        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({ name, screenIds, startDate, endDate, type })
        );
        files.forEach((file) => formData.append("files", file));

        return {
          url: "/payment/checkout-custom",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllBundleCampaignQuery,
  useGetAllCustomCampaignQuery,
  useGetMyselfAllBundleCampaignQuery,
  useGetMyselfAllCustomCampaignQuery,
  usePublishCampaignMutation
} = campaignsApi;
