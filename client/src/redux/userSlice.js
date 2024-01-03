import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    pending: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.pending = true;
      state.error = false
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.pending = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.currentUser = null
      state.pending = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    updateSuccess: (state, action) => {
      const { accessToken } = state.currentUser;
      state.currentUser = { ...action.payload, accessToken };
      state.pending = false;
      state.error = false;
    },
    updateFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.pending = false;
      state.error = false
    },
    setDefault: (state) => {
      state.pending = false;
      state.error = false;
    },
  }
});

export const { setDefault, loginSuccess, loginFailure, logout, loginStart, updateSuccess, updateFailure, updateStart } = userSlice.actions
export default userSlice.reducer;