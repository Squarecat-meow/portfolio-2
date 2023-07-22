import { Button } from "antd";
import React from "react";

import { useDispatch } from "react-redux";
import { upLogout } from "../../../../redux/slices/LoginSlices";
import { useNavigate } from "react-router-dom";

const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(upLogout());
    navigate("/");
  };

  return (
    <div>
      <Button type="primary" danger onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default UserSetting;
