import { baseApi } from "@/store/api/baseApi";

const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInTouch: builder.mutation({
            query: (payload) => ({
                url: "/get-in-touch",
                method: "POST",
                body: payload,

            }),
        }),
        getFeaturedScreen: builder.query({
            query: () => ({
                url: "/screen",
                method: "GET",
                params: { isFeatured: true }

            }),
        }),

    }),
});

export const {
    useGetInTouchMutation,
    useGetFeaturedScreenQuery
} = commonApi;
