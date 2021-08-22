import React from "react";

const Filter = ({ nameChange }) => {
  return (
    <div className="p-4">
      <label className="block">
        <span className="text-gray-500">Name</span>
        <input className="border-2 w-full md:w-[inherit] border-blue-400 bg-gray-400 block px-4 py-2" onChange={(e) => nameChange(e.target.value)}></input>
      </label>
    </div>
  );
};

export default Filter;
