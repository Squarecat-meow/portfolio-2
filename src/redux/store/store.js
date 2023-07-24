import { configureStore } from "@reduxjs/toolkit";

import LoginSlices from "../slices/LoginSlices";
import SignupSlices from "../slices/SignupSlices";

const store = configureStore({
  reducer: {
    login: LoginSlices,
    signup: SignupSlices,
  },
});

export default store;
