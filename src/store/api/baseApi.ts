import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setUser } from '../Slices/AuthSlice/authSlice';
import { RootState } from '../store';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  }
});

const baseQueryWithRefreshToken = async (args: string | FetchArgs, api, extraOptions) => {
  const state = api.getState() as RootState;
  const hadToken = !!state.auth.token;

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && hadToken) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      const newAccessToken: string | undefined = data?.data?.accessToken;

      if (res.ok && newAccessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(setUser({ user, token: newAccessToken }));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Screen', 'Banner', 'Bundle', 'User'],
  endpoints: () => ({})
});
