import { Calendar } from "antd";
import React from "react";

const CalendarWidget = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div className="flex flex-col items-center row-span-2 p-5 align-middle shadow-2xl backdrop-blur-md rounded-2xl bg-slate-300/50">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};

export default CalendarWidget;
