import React, { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { upBackground } from "../../redux/slices/BackgroundSlices";

const BackgroundComp = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.login.uid);
  const bgUrl = useSelector((state) => state.background.background);
  const dbRef = ref(database, `users/${uid}`);

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const imgUrl = snapshot.val().background;
      dispatch(upBackground(imgUrl));
    });
  });

  return (
    <div className="absolute flex">
      {bgUrl ? (
        <img
          src={bgUrl}
          alt="background"
          className="object-cover object-center w-screen h-screen"
        />
      ) : (
        <div className="absolute w-screen h-screen bg-gradient-to-r to-pink-300 via-sky-300 from-neutral-50" />
      )}
    </div>
  );
};

export default BackgroundComp;
