import React, { useEffect, useState, useRef } from "react";

import { Input, Select } from "antd";

import Greeting from "./Greeting/Greeting";

const { Search } = Input;
const { Option } = Select;

const SearchComp = () => {
  const [searchEngine, setSearchEngine] = useState("");

  const searchTextValue = useRef("");

  useEffect(() => {
    if (searchEngine === "") {
      setSearchEngine("Google");
    }
  }, [searchEngine]);

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
    <div className="flex flex-col items-center p-5 align-middle border-2 shadow-2xl backdrop-blur-md rounded-2xl bg-slate-300/50">
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
    </div>
  );
};

export default SearchComp;
