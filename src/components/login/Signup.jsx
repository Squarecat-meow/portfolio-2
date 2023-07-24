import React, { useState } from "react";

import { Input, Form, Button } from "antd";
import { motion, useAnimationControls } from "framer-motion";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ref as dbref, set } from "firebase/database";
import { auth, storage, database } from "../../config/firebase";

import AvatarUpload from "./AvatarUpload";

import { useSelector } from "react-redux";
import SignupCompleted from "./SignupCompleted";

const Signup = () => {
  //const [avatarUrl, setAvatarUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const imageUrl = useSelector((state) => state.signup.img);
  const controls = useAnimationControls();

  const handleSubmit = (e) => {
    const userEmail = e.email;
    const userPW = e.password;
    const username = e.username;

    createUserWithEmailAndPassword(auth, userEmail, userPW)
      .then((userCredential) => {
        const user = userCredential.user;
        handleUserDB(userEmail);
        setIsCompleted(true);
        controls.start({ opacity: 0 });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });

    const avatarPromise = new Promise((resolve, reject) => {
      const storageRef = ref(storage, "users/avatar-" + username);
      uploadString(storageRef, imageUrl, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          resolve(url);
        });
      });
    });

    const handleUserDB = async (userEmail) => {
      const userRef = dbref(database, "users/" + username);
      await avatarPromise.then((avatarUrl) => {
        console.log(avatarUrl);
        set(userRef, {
          userEmail: userEmail,
          avatarUrl: avatarUrl,
        });
      });
    };
  };

  /*   const handleAvatarImage = async (userEmail, username) => {

    await uploadString(storageRef, imageUrl, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        setAvatarUrl(url);
        handleUserDB(userEmail, username, avatarUrl);
      });
    });
  }; */

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="flex flex-col my-auto shadow-2xl w-fit h-fit bg-stone-200/50 backdrop-blur-md rounded-xl"
    >
      <motion.div initial={{ opacity: 1 }} animate={controls}>
        <h1 className="my-10 text-3xl font-extrabold text-center">Sign up</h1>
        <Form
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          layout="vertical"
          className="grid grid-cols-3 mx-5"
        >
          <div className="flex flex-col items-center h-96">
            <span>Avatar</span>
            <AvatarUpload />
          </div>
          <div className="flex flex-col col-span-2">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
              className="flex justify-center"
            >
              <Input placeholder="Email" className="w-80" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              className="flex justify-center"
            >
              <Input.Password placeholder="Password" className="w-80" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The password you entered do not match!")
                    );
                  },
                }),
              ]}
              className="flex justify-center"
              hasFeedback
            >
              <Input.Password placeholder="Confirm Password" className="w-80" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your Email!" }]}
              className="flex justify-center"
            >
              <Input placeholder="Username" className="w-80" />
            </Form.Item>
          </div>
          <div className="col-span-3">
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit" className="mx-10">
                Sign up
              </Button>
            </Form.Item>
          </div>
        </Form>
      </motion.div>
      <motion.div initial={{ opacity: 0 }}>
        {isCompleted && <SignupCompleted />}
      </motion.div>
    </motion.div>
  );
};

export default Signup;
