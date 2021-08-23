import React from "react";

const Filter = ({ nameChange, categoryChange }) => {
  return (
    <div className="p-4 flex flex-col sm:flex-row justify-end gap-4">
      <label className="block">
        <span className="text-gray-500">Name</span>
        <input className="outlined-input w-full py-2" onChange={(e) => nameChange(e.target.value)}></input>
      </label>

      <label className="block">
        <span className="text-gray-500">Category</span>
        <select className="outlined-input w-full py-[0.6rem]" defaultValue="unset" onChange={(e) => categoryChange(e.target.value)}>
          <option value={"Breaking Bad"}>Breaking Bad</option>
          <option value={"Better Call Saul"}>Better Call Saul</option>
          <option value={"unset"}>-</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
