import React from "react";

import { Input, Form, Button } from "antd";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Signup = () => {
  const handleSubmit = (e) => {
    const userEmail = e.username;
    const userPW = e.password;

    createUserWithEmailAndPassword(auth, userEmail, userPW)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="w-[400px] h-[400px] my-auto bg-stone-200/50 backdrop-blur-md rounded-xl shadow-2xl flex flex-col"
    >
      <h1 className="my-10 text-3xl font-extrabold text-center">Sign up</h1>
      <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your Email!" }]}
          className="flex justify-center"
        >
          <Input placeholder="Username" className="w-80" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
          className="flex justify-center"
        >
          <Input.Password placeholder="Password" className="w-80" />
        </Form.Item>
        <div className="flex justify-center">
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mx-10">
              Sign up
            </Button>
          </Form.Item>
        </div>
      </Form>
    </motion.div>
  );
};

export default Signup;
