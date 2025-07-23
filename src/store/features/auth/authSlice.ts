import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  codeId: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}
interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}
const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: IUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateProfile(state, action: PayloadAction<IUser>) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
