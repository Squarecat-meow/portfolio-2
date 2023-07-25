import React from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const uid = useSelector((state) => state.login.uid);
  const avatarUrl = useSelector((state) => state.login.avatarUrl);
  const username = useSelector((state) => state.login.username);

  return (
    <div className="">
      <h3>{username}</h3>
      <img className="w-[100px] rounded-full" src={avatarUrl} />
    </div>
  );
};

export default UserInfo;
