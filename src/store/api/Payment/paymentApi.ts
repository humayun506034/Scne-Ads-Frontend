import { baseApi } from "@/store/api/baseApi";

const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeScreenPayment: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/payment/checkout-custom",
        method: "POST",
        body: formData,
        // multipart/form-data automatically handled by fetch or axios inside baseApi
      }),
    }),
    makeBundlePayment: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/payment/checkout-bundle",
        method: "POST",
        body: formData,
        // multipart/form-data automatically handled by fetch or axios inside baseApi
      }),
    }),

    mySelfBundlePayment: builder.query<any,
      {
        page?: string        
      }>({
      query: ({ page}) => ({
        url: "/payment/myself-bundle-payments",
        method: "GET",
        params: {
          page, 
          // limit:"1"
        }
      }),
    }),
    mySelfScreenPayment: builder.query<any,  {
        page?: string        
      }>({
      query: ({ page}) => ({
        url: "/payment/myself-custom-payments",
        method: "GET",
        params: {
          page, 
          // limit:"1"
        }
      }),
    }),
  }),
});

export const {
  useMakeScreenPaymentMutation,
  useMakeBundlePaymentMutation,
  useMySelfBundlePaymentQuery,
  useMySelfScreenPaymentQuery
} = paymentsApi;
