import { baseApi } from "@/store/api/baseApi";
import { ILoginInput, IUser } from "@/types/auth";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IUser, ILoginInput>({
            query: (payload) => ({
                url: `/user/login`,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
})
export const { useLoginMutation } = authApi;