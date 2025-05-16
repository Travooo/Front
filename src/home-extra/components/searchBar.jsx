import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full p-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 border rounded-md focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
