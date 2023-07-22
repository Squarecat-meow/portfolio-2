import React, { useState } from "react";

import { SettingOutlined } from "@ant-design/icons";

import { FloatButton } from "antd";
import SettingModal from "./SettingModal/SettingModal";
import { AnimatePresence } from "framer-motion";

const Setting = () => {
  const [showModal, setShowModal] = useState(false);

  const settingClick = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <FloatButton
        icon={<SettingOutlined />}
        type="primary"
        style={{ bottom: "24px", right: "24px" }}
        onClick={settingClick}
      />
      <AnimatePresence>
        {showModal && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen backdrop-blur-md">
            <SettingModal setShowModal={setShowModal} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Setting;
