import React from "react";
import AppContext from "@/contexts/contexts";
import { useContext } from "react";


const Main = () => {
  const {darkMode} = useContext(AppContext)
  return (
    <div className={`flex-1 gap-4 ${darkMode ? "text-white" : "text-gray-900"} p-4 lg:p-[10px_15px] flex-col flex items-center`}>
      <div className="w-full p-4 flex gap-2 *:cursor-pointer *:text-lg *:font-semibold *:border *:p-[3px_10px] *:rounded-lg">
        <button className="bg-gray-700">Movies</button>
        <button>Series</button>
      </div>
      <div className="border h-100 w-full max-w-300  "></div>
      <h1 className="text-left w-full text-lg font-bold">Trending</h1>
      <div className="w-full movies flex gap-4 overflow-x-scroll p-4 ">
        {Array(10)
          .fill("")
          .map((_, i) => {
            return <div key={i} className="border duration-250 cursor-pointer hover:scale-105 shrink-0 h-60 w-50"></div>;
          })}
      </div>
      <h1 className="text-left w-full text-lg font-bold">Top rated</h1>
      <div className="w-full movies flex gap-4 overflow-x-scroll p-4 ">
        {Array(10)
          .fill("")
          .map((_, i) => {
            return <div key={i} className="border shrink-0 h-60 w-50 cursor-pointer duration-250 hover:scale-105 "></div>;
          })}
      </div>
    </div>
  );
};

export default Main;
