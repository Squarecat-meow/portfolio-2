import React from "react";

const Greeting = () => {
  const date = new Date();
  const hours = date.getHours();
  let greet;

  if (hours < 12) {
    greet = "Good morning.";
  } else if (hours >= 12 && hours < 18) {
    greet = "Good afternoon.";
  } else if (hours >= 18 && hours < 24) {
    greet = "Good evening.";
  }

  return (
    <div>
      <h1>{greet}</h1>
    </div>
  );
};

export default Greeting;
