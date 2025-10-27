import { baseApi } from "@/store/api/baseApi";
import { AllScreenApiResponse } from "@/types/locations";

const screenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocations: builder.query< AllScreenApiResponse,void>({
      query: () => ({
        url: "/screen",
        method: "GET",
      }),
    }),   
  }),
});

export const {
  useGetAllLocationsQuery,
} = screenApi;
