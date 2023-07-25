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
    signUpCompleted() {
      return initialState;
    },
  },
});

export const { imgUrl, signUpCompleted } = SignupSlices.actions;

export default SignupSlices.reducer;
