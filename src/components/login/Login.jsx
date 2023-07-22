import React from "react";

import { Input, Form, Checkbox, Button } from "antd";
import { motion } from "framer-motion";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { upLogin } from "../../redux/slices/LoginSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const userEmail = e.username;
    const userPW = e.password;
    signInWithEmailAndPassword(auth, userEmail, userPW)
      .then((userCredential) => {
        const user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };
        dispatch(upLogin(user));
        navigate("/mainpage");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="w-[400px] h-[400px] my-auto bg-stone-200/50 backdrop-blur-md rounded-xl shadow-2xl flex flex-col"
    >
      <h1 className="my-10 text-3xl font-extrabold text-center">Log in</h1>
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
        <div className="flex justify-between">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="mx-10">Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mx-10">
              Log in
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="flex justify-center">
        <Link to="/signup" className="no-underline">
          Sign up
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
