
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';


const baseQuery = fetchBaseQuery(
    {
        baseUrl: import.meta.env.VITE_BASE_URL
        , credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;


            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        }
    })

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // if status is 401 ,unauthorized, try to get a accessToken new token by refreshToken
    // if (result.error?.status === 401) {
    //     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const data = await res.json();

    //     if (data.data.accessToken) {
    //         const user = (api.getState() as RootState).auth.user;
    //         api.dispatch(setUser({ user, token: data.accessToken }));

    //         return baseQuery(args, api, extraOptions);
    //     } else {
    //         api.dispatch(logout());
    //     }
    //     return result;
    // }
    return result
}
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes:['Screen']
});

