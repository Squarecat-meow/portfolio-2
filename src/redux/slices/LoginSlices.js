import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  email: "",
  avatarUrl: "",
  username: "",
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
        avatarUrl: action.payload.avatarUrl,
        username: action.payload.username,
        isLogin: true,
      };
    },
    upLogout(state, action) {
      return initialState;
    },
  },
});

export const { upLogin, upLogout } = LoginSlices.actions;

export default LoginSlices.reducer;
