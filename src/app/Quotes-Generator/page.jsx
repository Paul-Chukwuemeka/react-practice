"use client";
import React from "react";
import { useState } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import axios from "axios";
import HomeBtn from "../components/HomeBtn";

const Page = () => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchQuote = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/quotes/random");
      setQuote(res.data.quote);
      setAuthor(res.data.author);
    } catch (error) {
      console.log(error);
    }
    finally{
        setLoading(false)
    }
  };
  return (
    <div className="flex flex-col font-dynapuff gap-10 items-center justify-center p-20 text-white">
      <HomeBtn/>
      <h1 className="text-3xl">Quote Generator</h1>
      <div className="w-150 mt-4 text-center p-10  border-dashed border-4 h-full min-h-40">
        {quote && author ? (
          <div>
            <h1 className="text-2xl my-2">{quote}</h1>
            <p className="text-xl text-right text-green-400 ">Author: {author}</p>
          </div>
        ) : (
          <h2 className="flex items-center w-full text-2xl font-semibold justify-center">
            Click button below to Get Quote <FaLongArrowAltDown />{" "}
          </h2>
        )}
      </div>

      <button
        className="text-xl w-48 rounded-lg cursor-pointer active:scale-95 bg-green-500 hover:bg-green-600 h-15 "
        onClick={() => {
          setLoading(true);
          fetchQuote();
        }}
        disabled = {loading}
      >
        {loading ? "Loading..." : "Generate Quote"}
      </button>
    </div>
  );
};

// https://dummyjson.com/quotes/random

/*
fetch data from api on request

react-icon for icons
axios for api requests


*/

export default Page;
