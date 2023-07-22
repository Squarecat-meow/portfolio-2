import React from "react";

import { motion } from "framer-motion";

import Setting from "./Setting/Setting";
import SearchComp from "./SearchComp";

const MainComp = () => {
  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <SearchComp />
      <Setting />
    </motion.div>
  );
};

export default MainComp;
