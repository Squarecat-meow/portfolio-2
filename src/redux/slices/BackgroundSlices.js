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
    resetBackground() {
      return initialState;
    },
  },
});

export const { upBackground, resetBackground } = BackgroundSlices.actions;

export default BackgroundSlices.reducer;
