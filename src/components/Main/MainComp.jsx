import { Input, Select } from "antd";
import React, { useRef, useState, useEffect } from "react";

import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import Greeting from "./Greeting/Greeting";

const { Search } = Input;
const { Option } = Select;

const MainComp = () => {
  const userUid = useSelector((state) => state.login.uid);
  const userEmail = useSelector((state) => state.login.email);

  const [searchEngine, setSearchEngine] = useState("");

  const searchTextValue = useRef("");

  useEffect(() => {
    if (searchEngine === "") {
      setSearchEngine("Google");
    }
  });

  const handleOptionChange = (value) => {
    setSearchEngine(value);
  };

  const onSearch = (value) => {
    let searchText = searchTextValue.current.input.value;
    searchText = searchText.replace(/\s+/g, "+");

    if (searchEngine === "Google") {
      window.open(`http://google.com/search?q=${searchText}`, "_blank");
    } else {
      window.open(`http://stackoverflow.com/search?q=${searchText}`, "_blank");
    }
  };

  const searchBefore = (
    <Select
      defaultValue="Google"
      onChange={handleOptionChange}
      style={{ width: 150 }}
    >
      <Option value="Google">Google</Option>
      <Option value="Stack Overflow">Stack Overflow</Option>
    </Select>
  );

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center p-5 align-middle border-2 shadow-2xl backdrop-blur-md rounded-2xl bg-slate-300/50"
    >
      <Greeting />
      <Search
        ref={searchTextValue}
        addonBefore={searchBefore}
        placeholder="Enter search text..."
        allowClear
        enterButton="Search"
        onSearch={onSearch}
        style={{ width: 500 }}
        className="mt-5"
      />
    </motion.div>
  );
};

export default MainComp;
