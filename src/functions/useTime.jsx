import { useState, useEffect } from "react";

const useTime = () => {
  const currentTime = new Date();
  const [getTime, setGetTime] = useState(currentTime.getSeconds());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      const times = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
      setGetTime(times);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [getTime]);

  return getTime;
};

export default useTime;
