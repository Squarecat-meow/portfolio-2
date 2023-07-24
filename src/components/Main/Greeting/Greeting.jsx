import React, { useState } from "react";

import { ref, get, child } from "firebase/database";
import { database } from "../../../config/firebase";
import { useSelector } from "react-redux";

const Greeting = () => {
  const uid = useSelector((state) => state.login.uid);
  const [userInfo, setUserInfo] = useState({});

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

  const dbref = ref(database);
  get(child(dbref, `users/${uid}`)).then((snapshot) => {
    setUserInfo(snapshot.val());
  });

  return (
    <div>
      <h1>{greet}</h1>
    </div>
  );
};

export default Greeting;
