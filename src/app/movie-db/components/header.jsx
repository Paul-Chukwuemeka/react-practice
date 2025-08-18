import React from "react";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import AppContext from "@/contexts/contexts";
import { useContext } from "react";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  return (
    <div
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} flex shadow-2xl z-50   w-full sticky top-0 left-0  p-4 px-10 justify-between`}
    >
      <h1 className="flex items-center gap-1 text-xl font-bold">
        RTB Movies <MdMovie className="text-amber-500" />
      </h1>
      <form className="border-1 p-2 w-80 flex items-center justify-between rounded-lg">
        <input
          type="text"
          placeholder="Search for movies or series"
          className={`focus:outline-none flex-1 ${darkMode ? "" :" text-gray-900 placeholder:text-gray-900"}`}
        />
        <button>
          <FaSearch />
        </button>
      </form>
      <button
        onClick={() => {
          setDarkMode(!darkMode);
        }}
        className="text-xl cursor-pointer"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Header;
