import { child, get, ref } from "firebase/database";
import React from "react";
import { database } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { upBackground } from "../../redux/slices/BackgroundSlices";

const BackgroundComp = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.login.uid);
  const bgUrl = useSelector((state) => state.background.background);
  const dbRef = ref(database);

  get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    if (snapshot.val().background) {
      dispatch(upBackground(snapshot.val().background));
    }
  });

  return (
    <div className="flex">
      {bgUrl ? (
        <img
          src={bgUrl}
          alt="background"
          className="object-cover object-top w-screen h-screen"
        />
      ) : (
        <div className="absolute w-screen h-screen bg-gradient-to-r to-pink-300 via-sky-300 from-neutral-50" />
      )}
    </div>
  );
};

export default BackgroundComp;
