import { createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  user: {
    role: 'customer' | 'admin'
    email: string
    first_name: string
    id: string
    is_verified: boolean
    last_name: string
    organisation_name: string
    organisation_role: "advertiser" | "agency"
    phone: string
  } | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {

      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, login, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: IAuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: IAuthState }) => state.auth.token;