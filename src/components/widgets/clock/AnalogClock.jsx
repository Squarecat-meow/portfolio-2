import React from "react";
import useTime from "../../../functions/useTime";

const AnalogClock = () => {
  const times = useTime();

  return (
    <div className="flex items-center justify-center p-5 shadow-2xl min-h-96 backdrop-blur-md rounded-2xl bg-slate-300/50">
      <div className="flex items-center justify-center w-1/2 rounded-full aspect-square bg-slate-50">
        <div
          id="second-hand"
          className="absolute w-1 h-20 bg-red-700 rounded-lg top-1/2"
          style={{
            transformOrigin: "top",
            transform: `rotate(${times.seconds * 6 - 180}deg)`,
          }}
        />
        <div
          id="minute-hand"
          className="absolute w-1 h-20 bg-black rounded-lg top-1/2"
          style={{
            transformOrigin: "top",
            transform: `rotate(${times.minutes * 6 - 180}deg)`,
          }}
        />
        <div
          id="hour-hand"
          className="absolute w-[6px] h-12 bg-black rounded-lg top-1/2"
          style={{
            transformOrigin: "top",
            transform: `rotate(${times.hours * 30 - 180}deg)`,
          }}
        />
        <div id="axle" className="absolute w-3 h-3 bg-black rounded-full" />
      </div>
    </div>
  );
};

export default AnalogClock;
