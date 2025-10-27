import { baseApi } from "./baseApi";

export interface Banner {
  id: string;
  title: string;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetAllBannersQuery } = bannerApi;
