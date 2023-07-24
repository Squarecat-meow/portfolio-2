import React from "react";

import { CheckCircleOutlined } from "@ant-design/icons";

const SignupCompleted = () => {
  return (
    <div className="flex flex-col justify-center">
      <CheckCircleOutlined className="m-24 text-green-600 text-9xl" />
      <h1 className="text-center">Lookin' good!</h1>
    </div>
  );
};

export default SignupCompleted;
