import React from "react";
import CalendarComp from "./CalendarComp";

const CalendarWidget = () => {
  return (
    <div className="flex flex-col items-center row-span-2 p-5 align-middle shadow-2xl backdrop-blur-md rounded-2xl bg-slate-300/50">
      <CalendarComp />
    </div>
  );
};

export default CalendarWidget;
