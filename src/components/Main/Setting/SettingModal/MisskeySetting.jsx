import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MisskeyToken } from "../../../../redux/slices/MisskeySlices";

const MisskeySetting = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.misskey.token);
  const server = useSelector((state) => state.misskey.server);

  const handleSubmit = (e) => {
    console.log(e);
    dispatch(MisskeyToken(e));
  };

  return (
    <div>
      <h1>Misskey Token</h1>
      <div className="flex flex-col">
        <span>current Server: {server}</span>
        <span>current Token: {token}</span>
      </div>
      <Form className="mt-5 mr-5" onFinish={handleSubmit}>
        <Form.Item label="Misskey Server" name="server">
          <Input />
        </Form.Item>
        <Form.Item label="Misskey Token" name="token">
          <Input />
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

export default MisskeySetting;
