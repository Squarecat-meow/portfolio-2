import { Button, Popconfirm } from "antd";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { upLogout } from "../../../../redux/slices/LoginSlices";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "firebase/auth";
import { auth, database, storage } from "../../../../config/firebase";
import { ref as dbref, remove, set } from "firebase/database";
import { deleteObject, ref } from "firebase/storage";
import UserInfo from "./UserInfo";

const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.login.uid);

  const handleLogout = () => {
    dispatch(upLogout());
    navigate("/");
  };

  const handleSignout = () => {
    const user = auth.currentUser;
    remove(dbref(database, `users/${uid}`));
    deleteObject(ref(storage, `users/${uid}`));
    deleteUser(user)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col ">
      <UserInfo />
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
    </div>
  );
};

export default UserSetting;
