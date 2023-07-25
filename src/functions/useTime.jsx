import { useState } from "react";

const getCurrentTime = () => {
  const [getTime, setGetTime] = useState();

  const currentTime = new Date();

  setInterval(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const times = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    console.log(times);

    setGetTime(times);
  }, 1000);

  return getTime;
};

export default getCurrentTime;
