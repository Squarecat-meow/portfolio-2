import React from "react";

import Login from "./Login";
import Signup from "./Signup";
import PrivateComp from "../Main/PrivateComp";
import MainComp from "../Main/MainComp";

import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import BackgroundImg from "../../static/img/yande.re 789141 hololive hololive_english ninomae_ina'nis ninomae_ina'nis_(artist) photoshop wallpaper.jpg";

const LoginComp = () => {
  const location = useLocation();
  return (
    <div className="flex">
      <img src={BackgroundImg} className="object-cover w-screen h-screen" />
      <div className="absolute flex items-center justify-center w-screen h-screen">
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateComp />}>
              <Route path="/mainpage" element={<MainComp />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginComp;
