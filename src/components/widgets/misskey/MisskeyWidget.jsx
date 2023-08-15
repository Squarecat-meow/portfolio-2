import React, { useEffect, useState } from "react";

const MisskeyWidget = () => {
  const [receivedData, setReceivedData] = useState([]);
  const webSocketUrl =
    "wss://k.lapy.link/streaming?i=Wrpny1kTXaLg3ro6Dwt49pO1nyTtecy6";
  const ws = new WebSocket(webSocketUrl);

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
    let renote = [];
    let file = [];
    if (data.body.body.fileIds) {
      const fileLength = data.body.body.files.length;
      for (let i = 0; i < fileLength; i++) {
        file.push(data.body.body.files[i].url);
      }
    }

    if (data.body.body.renote) {
      renote.push({
        renoteText: data.body.body.renote.text,
        renoteUser: data.body.body.renote.user,
      });
    }

    const postData = {
      text: text,
      avatarUrl: avatarUrl,
      file: file,
      renote: renote,
    };

    return postData;
  };

  console.log(receivedData);

  return (
    <div className="flex flex-col row-span-2 p-5 overflow-y-auto shadow-2xl h-[576px] backdrop-blur-md rounded-2xl bg-slate-300/50">
      <h1 className="absolute top-3">MisskeyWidget</h1>
      <div className="flex flex-col-reverse mt-8">
        {receivedData.map((item, i) => (
          <div key={i} className="flex items-center grid-cols-2 my-2">
            <div>
              <img src={item.avatarUrl} className="w-12 rounded-full" />
            </div>
            <div className="ml-2">
              <span key={i} className="break-all">
                {item.text}
              </span>
              {item.renote.length !== 0 && (
                <span>RE: {item.renote[0].renoteText}</span>
              )}
            </div>
            {item.file.length === 0 ? null : (
              <div>
                {item.file.map((image, i) => (
                  <img
                    src={image}
                    className="object-cover w-48 h-32"
                    alt="user uploaded"
                    key={i}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisskeyWidget;
