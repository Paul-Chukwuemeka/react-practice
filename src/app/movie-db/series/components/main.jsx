import React from "react";
import { useContext } from "react";
import AppContext from "@/contexts/contexts";
import Link from "next/link";

const Main = () => {
    const {darkMode} = useContext(AppContext)
  return (
    <div
      className={`flex-1 gap-4 ${
        darkMode ? "text-white" : "text-gray-900"
      } p-4 lg:p-[10px_15px] flex-col flex items-center`}
    >
      <div className="w-full p-4 flex gap-2 *:cursor-pointer *:text-lg *:font-semibold *:border *:p-[3px_10px] *:rounded-lg">
        <Link href={"/movie-db"}>
          <button className="bg-gray-700 cursor-pointer">Movies</button>
        </Link>
        <Link href={"/movie-db/series"}>
          <button className="cursor-pointer">Series</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
