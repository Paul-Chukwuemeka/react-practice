"use client";

import { FaPlus, FaMinus } from "react-icons/fa";
import { useState, useEffect } from "react";
import HomeBtn from "../components/HomeBtn"

const Page = () => {
  const [number, setNumber] = useState(0);

  function countDown() {
    if (number == 0) return;

    const count = setInterval(() => {
      setNumber((prev) => {
        if (prev <= 0) {
          clearInterval(count);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  }

  return (
    <div className="p-20 flex flex-col items-center gap-5 text-white relative">
      <HomeBtn/>
      <h1 className="text-size-header text-header">Counter App</h1>
      <div className="flex items-center gap-3">
        <button
          className="w-32 flex justify-center items-center  text-center h-12 rounded-lg bg-green-600"
          onClick={() => {
            setNumber((prev) => prev + 1);
          }}
        >
          <FaPlus />
        </button>
        <div className="h-44 w-44 text-6xl flex items-center justify-center border-4 rounded-full">
          {number}
        </div>
        <button
          className="w-32 flex justify-center items-center  text-center h-12 rounded-lg bg-red-600"
          onClick={() => {
            if (number == 0) {
              return;
            }
            setNumber(number - 1);
          }}
        >
          <FaMinus />
        </button>
      </div>
      <button
        className="w-40 text-lg rounded-lg h-12 bg-blue-600"
        onClick={() => {
          countDown();
        }}
      >
        Count Down
      </button>
    </div>
  );
};

export default Page;

/* 
goal: Create a simple counter app with increment and decrement functionality.
Increment and decrement buttons should be styled with Tailwind CSS.
timer : count Down from set Value

tools: useState for state management, Tailwind CSS for styling, and React Icons for icons.

*/

// ssr - server side rendering
