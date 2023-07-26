import React, { useState } from "react";
import UserSetting from "./UserSetting/UserSetting";

import { useDispatch, useSelector } from "react-redux";
import { upLogout } from "../../../redux/slices/LoginSlices";

import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { CloseOutlined } from "@ant-design/icons";

const CascaderComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserSetting, setShowUserSetting] = useState(false);

  const handleLogout = () => {
    dispatch(upLogout());
    navigate("/");
  };

  const handleClose = () => {
    setShowUserSetting(false);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 5 }}
        className="absolute flex flex-col items-center justify-center w-24 h-20 shadow-xl top-1 left-16 bg-slate-200 rounded-2xl"
      >
        <div
          className="flex px-3 py-1 bg-transparent rounded-md cursor-pointer hover:bg-blue-500"
          onClick={() => setShowUserSetting(true)}
        >
          <span>Setting</span>
        </div>
        <div
          className="flex px-3 py-1 bg-transparent rounded-md cursor-pointer hover:bg-red-500"
          onClick={handleLogout}
        >
          <span>Log out</span>
        </div>
      </motion.div>
      <AnimatePresence>
        {showUserSetting && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen backdrop-blur-md">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-[600px] h-[400px] bg-slate-300/70 rounded-2xl shadow-2xl"
            >
              <div className="flex flex-row-reverse">
                <CloseOutlined onClick={handleClose} className="m-3" />
              </div>
              <UserSetting />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserComp = () => {
  const avatarUrl = useSelector((state) => state.login.avatarUrl);
  const [showCascader, setShowCascader] = useState(false);

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
