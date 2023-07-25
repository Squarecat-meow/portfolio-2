import React, { useState } from "react";

import { Input, Form, Button } from "antd";
import { motion } from "framer-motion";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ref as dbref, set } from "firebase/database";
import { auth, storage, database } from "../../config/firebase";

import AvatarUpload from "./AvatarUpload";

import { useSelector } from "react-redux";
import SignupCompleted from "./SignupCompleted";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const imageUrl = useSelector((state) => state.signup.img);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const userEmail = e.email;
    const userPW = e.password;
    const username = e.username;

    createUserWithEmailAndPassword(auth, userEmail, userPW)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        handleUserDB(uid);
        setIsCompleted(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });

    const avatarPromise = (uid) => {
      return new Promise((resolve) => {
        const storageRef = ref(storage, "users/" + uid);
        uploadString(storageRef, imageUrl, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            resolve(url);
          });
        });
      });
    };

    const handleUserDB = async (uid) => {
      const userRef = dbref(database, `users/${uid}`);
      await avatarPromise(uid).then((avatarUrl) => {
        set(userRef, {
          username: username,
          avatarUrl: avatarUrl,
          userEmail: userEmail,
        });
      });
    };
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="flex flex-col w-2/4 my-auto shadow-2xl h-3/5 bg-stone-200/50 backdrop-blur-md rounded-xl"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {isCompleted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SignupCompleted />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="my-10 text-3xl font-extrabold text-center">
              Sign up
            </h1>
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
                    {
                      required: true,
                      message: "Please enter your username!",
                    },
                  ]}
                  className="flex justify-center"
                >
                  <Input placeholder="Email" className="w-80" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
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
                  <Input.Password
                    placeholder="Confirm Password"
                    className="w-80"
                  />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please enter your Email!" },
                  ]}
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
        )}
      </motion.div>
    </motion.div>
  );
};

export default Signup;
