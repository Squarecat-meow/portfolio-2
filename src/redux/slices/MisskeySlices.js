import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  server: "",
};

const MisskeySlices = createSlice({
  name: "misskey",
  initialState,
  reducers: {
    MisskeyToken(state, action) {
      state.token = action.payload.token;
      state.server = action.payload.server;
    },
  },
});

export const { MisskeyToken } = MisskeySlices.actions;

export default MisskeySlices.reducer;
