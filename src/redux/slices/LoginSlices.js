import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const LoginSlices = createSlice({
  name: "login",
  initialState,
  reducers: {
    upLogin(state, action) {
      return (state = action.payload);
    },
  },
});

export const { upLogin } = LoginSlices.actions;

export default LoginSlices.reducer;
