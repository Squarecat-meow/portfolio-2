import React from "react";

import { CloseOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";

import EnvSetting from "./EnvSetting";

const SettingModal = ({ setShowModal }) => {
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <motion.div
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="w-[600px] h-[400px] bg-slate-300/70 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-row-reverse">
        <CloseOutlined onClick={handleClose} className="m-3" />
      </div>
      <EnvSetting />
    </motion.div>
  );
};

export default SettingModal;
