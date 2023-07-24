import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  img: "",
};

const SignupSlices = createSlice({
  name: "signup",
  initialState,
  reducers: {
    imgUrl(state, action) {
      state.img = action.payload;
    },
  },
});

export const { imgUrl } = SignupSlices.actions;

export default SignupSlices.reducer;
