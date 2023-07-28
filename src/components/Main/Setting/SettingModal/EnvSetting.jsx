import React, { useState } from "react";

import { Alert, Button, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AnimatePresence, motion } from "framer-motion";

import { useSelector } from "react-redux";

import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ref as dbref, update } from "firebase/database";
import { database, storage } from "../../../../config/firebase";

const EnvSetting = () => {
  const [imgPreview, setImgPreview] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const uid = useSelector((state) => state.login.uid);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(() => {
      reader.onload = () => {
        setImgPreview(reader.result);
      };
    });
  };

  const backgroundPromise = (uid, imgPreview) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `users/${uid}/background`);
      uploadString(storageRef, imgPreview, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  const handleSubmit = () => {
    backgroundPromise(uid, imgPreview).then((backgroundUrl) => {
      const dbRef = dbref(database, `users/${uid}`);
      const backgroundObj = {
        background: backgroundUrl,
      };
      update(dbRef, backgroundObj);
      setIsSuccessful(true);
    });
  };

  const uploadButton = (
    <div className="flex flex-col justify-center w-20 h-20 text-center ">
      <PlusOutlined />
      <span>Upload</span>
    </div>
  );

  return (
    <div>
      {isSuccessful && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <Alert message="Background Change Success" type="success" />
          </motion.div>
        </AnimatePresence>
      )}

      <Form onFinish={handleSubmit}>
        <h1>Background Image</h1>
        <Form.Item>
          <div className="flex justify-center items-center mt-5 w-[260px] transition border-2 border-dashed cursor-pointer border-neutral-400 hover:border-teal-400">
            <Upload
              showUploadList={false}
              accept="image/png, image/jpeg"
              beforeUpload={beforeUpload}
            >
              {imgPreview ? (
                <img
                  src={imgPreview}
                  alt="Selected Background"
                  style={{
                    width: "240px",
                    marginTop: "7px",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EnvSetting;
