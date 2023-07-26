import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { upLogout } from "../../../redux/slices/LoginSlices";

import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const CascaderComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(upLogout());
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 5 }}
      className="absolute flex flex-col items-center justify-center w-24 h-12 shadow-xl top-1 left-16 bg-slate-200 rounded-2xl"
    >
      <div
        className="flex px-3 py-1 bg-transparent rounded-md cursor-pointer hover:bg-red-500"
        onClick={handleLogout}
      >
        <h3>Log out</h3>
      </div>
    </motion.div>
  );
};

const UserComp = () => {
  const avatarUrl = useSelector((state) => state.login.avatarUrl);
  const [showCascader, setShowCascader] = useState(false);

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div className="absolute top-5 left-5">
      <img
        src={avatarUrl}
        alt="avatar"
        className="rounded-full shadow-xl w-14 h-14"
        onClick={() => setShowCascader(!showCascader)}
      />
      <AnimatePresence>{showCascader && <CascaderComp />}</AnimatePresence>
    </div>
  );
};

export default UserComp;
