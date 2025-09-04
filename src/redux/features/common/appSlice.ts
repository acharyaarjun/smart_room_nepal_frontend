import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isNotificationPending: boolean;
  isActiveBooking: boolean;
}

const initialState: AppState = {
  isNotificationPending: true,
  isActiveBooking: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNotificationPending: (state, action) => {
      state.isNotificationPending = action.payload;
    },
    toggleActiveBooking: (state) => {
      state.isActiveBooking = !state.isActiveBooking;
    },
  },
});

export const { setNotificationPending, toggleActiveBooking } = appSlice.actions;
export default appSlice.reducer;
