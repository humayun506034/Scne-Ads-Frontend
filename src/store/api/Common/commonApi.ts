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

    }),
});

export const {
    useGetInTouchMutation
} = commonApi;
