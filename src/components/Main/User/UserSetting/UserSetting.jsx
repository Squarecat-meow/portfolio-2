import { Button, Popconfirm } from "antd";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { upLogout } from "../../../../redux/slices/LoginSlices";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "firebase/auth";
import { auth, database, storage } from "../../../../config/firebase";
import { ref as dbref, remove, set } from "firebase/database";
import { deleteObject, listAll, ref } from "firebase/storage";
import UserInfo from "./UserInfo";

const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.login.uid);

  const handleSignout = () => {
    const user = auth.currentUser;
    dispatch(upLogout());
    remove(dbref(database, `users/${uid}`));
    listAll(ref(storage, `users/${uid}/`)).then((res) => {
      res.items.forEach((itemRef) => {
        deleteObject(itemRef);
      });
    });
    deleteUser(user)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col m-5">
      <UserInfo />
      <div className="my-5">
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
