import React from "react";

import { Tabs } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";

import UserSetting from "./UserSetting/UserSetting";
import EnvSetting from "./EnvSetting";

const SettingModal = ({ setShowModal }) => {
  const tabItems = [
    {
      key: 1,
      label: "User Setting",
      children: <UserSetting />,
    },
    {
      key: 2,
      label: "Environment Setting",
      children: <EnvSetting />,
    },
  ];

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
      <div className="flex">
        <Tabs tabPosition="left" items={tabItems} />
      </div>
    </motion.div>
  );
};

export default SettingModal;
