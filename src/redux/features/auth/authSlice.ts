import { User } from "@/types/auth/user";
import { getItemSecurely, setItemSecurely } from "@/utils/storageUtil";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isUserInfoLoading: boolean | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getItemSecurely("user"),
  user: getItemSecurely("user"),
  isUserInfoLoading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      setItemSecurely("user", user);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
