import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";

import { api as misskeyApi } from "misskey-js";

const MisskeyWidget = () => {
  const [dataSent, setDataSent] = useState(false);
  const [receivedData, setReceivedData] = useState([]);
  const webSocketUrl =
    "wss://k.lapy.link/streaming?i=Wrpny1kTXaLg3ro6Dwt49pO1nyTtecy6";
  const ws = new WebSocket(webSocketUrl);
  const id = uuid();

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to " + webSocketUrl);
      ws.send(
        JSON.stringify({
          type: "connect",
          body: {
            channel: "globalTimeline",
            id: "3",
          },
        })
      );
      setDataSent(true);
    };
    ws.onclose = () => {
      console.log("Disconnected to " + webSocketUrl);
    };
    ws.onerror = (error) => {
      console.log("Connection Failed with: " + error);
    };
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const postData = processingJSON(data);
      setReceivedData((prevData) => [...prevData, postData]);
    };

    return () => {
      console.log("Clean up");
      ws.close();
    };
  }, []);

  const processingJSON = (data) => {
    const text = data.body.body.text;
    const avatarUrl = data.body.body.user.avatarUrl;

    const postData = {
      text: text,
      avatarUrl: avatarUrl,
    };

    return postData;
  };

  return (
    <div className="flex flex-col items-center row-span-2 p-5 overflow-y-auto shadow-2xl h-[576px] backdrop-blur-md rounded-2xl bg-slate-300/50">
      <h1 className="absolute top-3">MisskeyWidget</h1>
      <div className="flex flex-col-reverse">
        {receivedData.map((item, i) => (
          <div className="flex items-center grid-cols-2 my-2">
            <div>
              <img src={item.avatarUrl} className="w-12 rounded-full" />
            </div>
            <div className="ml-2">
              <span key={i}>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisskeyWidget;
