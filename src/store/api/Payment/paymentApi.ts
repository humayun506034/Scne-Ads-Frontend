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
  }),
});

export const { useMakeScreenPaymentMutation , useMakeBundlePaymentMutation} = paymentsApi;
