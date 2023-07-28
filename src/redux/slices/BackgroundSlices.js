import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  background: "",
};

const BackgroundSlices = createSlice({
  name: "background",
  initialState,
  reducers: {
    upBackground(state, action) {
      state.background = action.payload;
    },
  },
});

export const { upBackground } = BackgroundSlices.actions;

export default BackgroundSlices.reducer;
