"use client";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex z-10 flex-col px-5 pb-3 mt-0 w-full max-md:px-5 max-md:mt-0 max-md:max-w-full absolute top-[78px]">
      <div className="relative w-full text-base leading-none shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-zinc-400 max-md:max-w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="overflow-hidden flex-1 shrink self-stretch px-4 py-3 pl-10 w-full bg-white rounded-lg border-2 border-solid basis-0 border-neutral-700 min-w-60 max-md:max-w-full focus:outline-none focus:border-amber-500"
        />
        <span className="absolute z-10 left-3.5 top-3 text-lg font-medium leading-3 text-center text-black">
          􀊫
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
