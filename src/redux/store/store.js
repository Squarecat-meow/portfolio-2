import { configureStore } from "@reduxjs/toolkit";

import LoginSlices from "../slices/LoginSlices";

const store = configureStore({
  reducer: {
    login: LoginSlices,
  },
});

export default store;
