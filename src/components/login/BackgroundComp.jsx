import { ref } from "firebase/storage";
import React from "react";
import { storage } from "../../config/firebase";

const BackgroundComp = () => {
  const backgroundRef = ref(storage, `${uid}-background.*`);

  return (
    <div>
      <img src={backgroundUrl} alt="background" />
    </div>
  );
};

export default BackgroundComp;
