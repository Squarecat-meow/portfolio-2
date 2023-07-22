import { Button, Popconfirm } from "antd";
import React from "react";

import { useDispatch } from "react-redux";
import { upLogout } from "../../../../redux/slices/LoginSlices";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "firebase/auth";
import { auth } from "../../../../config/firebase";

const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(upLogout());
    navigate("/");
  };

  const handleSignout = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="grid grid-flow-col gap-4">
      <Button type="default" danger onClick={handleLogout}>
        Log out
      </Button>
      <Popconfirm
        title="Delete account"
        description="Are you sure to delete this account?"
        onConfirm={handleSignout}
      >
        <Button type="primary" danger>
          Sign out
        </Button>
      </Popconfirm>
    </div>
  );
};

export default UserSetting;
