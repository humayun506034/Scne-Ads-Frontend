import { baseApi } from "@/store/api/baseApi";
import { ApiResponse, ILoginInput, IRegisterInput, IRequestResetPasswordInput, IResetPasswordInput, ISignupData, IVerifyOtpInput, ILoginResponseData } from "@/types/auth";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<ILoginResponseData>, ILoginInput>({
            query: (payload) => ({
                url: `auth/login`,
                method: 'POST',
                body: payload,
            }),
        }),
        signup: builder.mutation<ApiResponse<ISignupData>, IRegisterInput>({
            query: (payload) => ({
                url: `auth/create-user`,
                method: 'POST',
                body: payload,
            }),
        }),
        verifyOtp: builder.mutation<ApiResponse<ISignupData>, IVerifyOtpInput>({
            query: (payload) => ({
                url: `auth/verify-otp`,
                method: 'POST',
                body: payload,
            }),
        }),
        requestResetPassword: builder.mutation<ApiResponse<{ email: string }>, IRequestResetPasswordInput>({
            query: (payload) => ({
                url: `auth/request-reset-password`,
                method: 'POST',
                body: payload,
            }),
        }),
        resetPassword: builder.mutation<ApiResponse<{ email: string, newPassword: string, otp: string }>, IResetPasswordInput>({
            query: (payload) => ({
                url: `auth/reset-password`,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
})
export const { useLoginMutation, useSignupMutation, useVerifyOtpMutation, useRequestResetPasswordMutation, useResetPasswordMutation } = authApi;
