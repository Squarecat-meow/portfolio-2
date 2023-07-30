import React from "react";

import { motion } from "framer-motion";

import Setting from "./Setting/Setting";
import SearchComp from "./SearchComp";
import AnalogClock from "../widgets/clock/AnalogClock";
import UserComp from "./User/UserComp";
import CalendarWidget from "../widgets/calendar/CalendarWidget";

const MainComp = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-5 m-24 h-fit"
    >
      <AnalogClock />
      <SearchComp />
      <CalendarWidget />
      <UserComp />
      <Setting />
    </motion.div>
  );
};

export default MainComp;
