import React from "react";

const Header = () => {
  const year = new Date().getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date()
  );

  return (
    <div className="grid justify-items-center">
      <span>{year}</span>
      <h1>{month}</h1>
    </div>
  );
};

const Body = () => {
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();

  let currentDays = [];

  for (let i = 0; i < 35; i++) {
    if (i === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (i === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (i - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDays = {
      currentMonth: firstDayOfMonth.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDays);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 justify-items-center">
        {day.map((days, i) => (
          <span key={i}>{days}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5">
        {currentDays.map((day, i) => (
          <div key={i} className="grid w-12 h-12 justify-items-center">
            <span>{day.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarComp = () => {
  return (
    <div className="grid w-full justify-items-center">
      <Header />
      <Body />
    </div>
  );
};

export default CalendarComp;
