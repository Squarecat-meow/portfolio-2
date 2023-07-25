import React from "react";

import { motion } from "framer-motion";

import Setting from "./Setting/Setting";
import SearchComp from "./SearchComp";
import AnalogClock from "../widgets/clock/AnalogClock";

const MainComp = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="grid gap-3"
    >
      <AnalogClock />
      <SearchComp />
      <Setting />
    </motion.div>
  );
};

export default MainComp;
