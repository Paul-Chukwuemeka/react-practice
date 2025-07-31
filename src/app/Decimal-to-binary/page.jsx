"use client";
import React, { useEffect, useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";

const Page = () => {
  // State to store the binary result
  const [result, setResult] = useState("");
  // State to store the decimal input from the user
  const [input, setInput] = useState(0);

  // Temporary variable to build the binary string
  let test = "";
  // Recursive function to convert a decimal number to binary
  function Decimaltobinary(num) {
    /// recursive function  0- function that calls itself
    // Append the remainder of the number divided by 2 to the test string
    test = (test += num % 2).split("").reverse().join("");
    // Base case for the recursion
    if (num == 0 || num == 1) return;
    // Recursive call with the number divided by 2
    return Decimaltobinary(Math.floor(num / 2));
  }

  // Function to trigger the conversion and update the result state
  function convert(){
    // Call the recursive function to convert the input number
    Decimaltobinary(input)
    // Update the result state with the binary string
    setResult(test)
  }

  return (
    <div className="p-20 flex flex-col items-center gap-5 text-white relative">
      <h1 className="text-3xl font-semibold">Decimal To Binary</h1>
      <div className="w-100 flex flex-col items-center justify-between shadow-xl p-4 bg-gray-800 rounded-lg h-120">
        {/* Form to get user input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert()
          }}
          className="border rounded-3xl w-full h-14 flex items-center p-2"
        >
          {/* Input field for the decimal number */}
          <input
            type="number"
            className="flex-1 focus:outline-none"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          {/* Button to trigger the conversion */}
          <button className="bg-pink-500 w-20 rounded-lg h-full hover:bg-pink-600 duration-200">
            Convert
          </button>
        </form>

        <FaArrowDownLong className="text-5xl" />
        {/* Display the binary result */}
        <h1 className="p-4 text-3xl font-semibold h-40">{result ? result :" Result goes Here"}</h1>
      </div>
    </div>
  );
};

export default Page;