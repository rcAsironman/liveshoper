import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: true, // Initial state of authentication
  },
  reducers: {
    toggleState(state,action) {
      state.isAuthenticated =  action.payload
    },
  },
});

export const { toggleState } = AuthSlice.actions;

export default AuthSlice.reducer;
