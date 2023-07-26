import React from "react";
import useTime from "../../../functions/useTime";

const AnalogClock = () => {
  const times = useTime();

  return (
    <div className="flex flex-col items-center p-5 align-middle shadow-2xl backdrop-blur-md rounded-2xl bg-slate-300/50">
      <div className="flex justify-center w-[200px] h-[200px] bg-slate-50 rounded-full">
        <div
          className="absolute w-1 h-20 bg-red-700 rounded-lg top-12"
          style={{
            transformOrigin: "bottom",
            transform: `rotate(${times.seconds * 6}deg)`,
          }}
        />
        <div
          className="absolute w-1 h-20 bg-black rounded-lg top-12"
          style={{
            transformOrigin: "bottom",
            transform: `rotate(${times.minutes * 6}deg)`,
          }}
        />
        <div
          className="absolute w-[6px] h-12 bg-black rounded-lg top-20"
          style={{
            transformOrigin: "bottom",
            transform: `rotate(${times.hours * 30}deg)`,
          }}
        />
        <div className="absolute w-3 h-3 bg-black rounded-full top-1/2" />
      </div>
    </div>
  );
};

export default AnalogClock;
