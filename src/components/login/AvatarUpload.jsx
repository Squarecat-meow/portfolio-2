import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { imgUrl } from "../../redux/slices/SignupSlices";

const AvatarUpload = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.signup.img);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(() => {
      reader.onload = () => {
        dispatch(imgUrl(reader.result));
      };
    });
  };

  const uploadButton = (
    <div className="flex flex-col justify-center">
      <PlusOutlined />
      <span className="mt-3">Upload</span>
    </div>
  );

  return (
    <div>
      <Upload
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        accept="image/png, image/jpeg"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default AvatarUpload;
