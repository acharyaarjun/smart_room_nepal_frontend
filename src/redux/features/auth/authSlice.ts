import { User } from "@/types/auth/user";
import { getItemSecurely } from "@/utils/storageUtil";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isUserInfoLoading: boolean | null;
  availableCredits: number;
}

const initialState: AuthState = {
  isAuthenticated: !!getItemSecurely("user"),
  user: getItemSecurely("user")
    ? JSON.parse(getItemSecurely("user") as string)
    : null,
  isUserInfoLoading: null,
  availableCredits: getItemSecurely("availableCredits")
    ? parseInt(getItemSecurely("availableCredits") as string, 10)
    : 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: User; availableCredits: number }>
    ) => {
      const { user, availableCredits } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.availableCredits = availableCredits;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.availableCredits = 0;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
