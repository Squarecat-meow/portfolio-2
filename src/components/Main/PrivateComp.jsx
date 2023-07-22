import React from "react";
import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";

const PrivateComp = () => {
  const userIsLogin = useSelector((state) => state.login.isLogin);

  return <div>{userIsLogin ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateComp;
