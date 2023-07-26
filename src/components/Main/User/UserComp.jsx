import { Cascader } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const UserComp = () => {
  const avatarUrl = useSelector((state) => state.login.avatarUrl);

  const options = [
    {
      label: "Log out",
      value: "logout",
    },
    {
      label: "Sign out",
      value: "signout",
    },
  ];

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div className="absolute top-5 left-5">
      <Cascader options={options} onChange={onChange}>
        <img
          src={avatarUrl}
          alt="avatar"
          className="rounded-full shadow-xl w-14 h-14"
        />
      </Cascader>
    </div>
  );
};

export default UserComp;
