import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  email: "",
  isLogin: false,
};

const LoginSlices = createSlice({
  name: "login",
  initialState,
  reducers: {
    upLogin(state, action) {
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        isLogin: true,
      };
    },
    upLogout(state, action) {
      return {
        uid: "",
        email: "",
        isLogin: false,
      };
    },
  },
});

export const { upLogin, upLogout } = LoginSlices.actions;

export default LoginSlices.reducer;
