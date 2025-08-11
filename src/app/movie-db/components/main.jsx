import React from "react";
import AppContext from "@/contexts/contexts";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import useFetchPopular from "@/hooks/usefetchPopular";
import useFetchTrending from "@/hooks/usefetchTrending";

const Main = () => {
  const { darkMode } = useContext(AppContext);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [current, setCurrent] = useState(null);

  const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  useEffect(() => {
    async function getData() {
      const response = await useFetchPopular();
      setPopular(response);
    }
    getData();
    async function getTrending() {
      const response = await useFetchTrending();
      setTrending(response);
    }

    getTrending();
  }, []);

  useEffect(() => {
    if (trending) {
      setInterval(() => {
        setCurrent(trending[Math.floor(Math.random() * trending.length)]);
      }, 10000);
    }
  }, [trending]);

  return (
    <div
      className={`flex-1 gap-4 ${
        darkMode ? "text-white" : "text-gray-900"
      } p-4 lg:p-[10px_15px] flex-col flex items-center`}
    >
      <div className="w-full p-4 flex gap-2 *:cursor-pointer *:text-lg *:font-semibold *:border *:p-[3px_10px] *:rounded-lg">
        <button className="bg-gray-700">Movies</button>
        <button>Series</button>
      </div>
      <div className="border h-100 w-full max-w-300   ">
        {current && (
          <Image
            src={baseImageUrl + current.backdrop_path}
            width={1200}
            height={400}
            alt=""
            aria-label=""
            className="w-full h-full object-fill"
          />
        )}
      </div>
      <h1 className="text-left px-4 w-full text-xl font-bold">
        Popular Movies
      </h1>
      <div className="w-full movies flex gap-4 overflow-x-scroll p-4 py-1 ">
        {popular &&
          popular.map((item, i) => {
            return (
              <div
                key={i}
                className=" duration-250 cursor-pointer hover:scale-105 shrink-0 h-70 w-50"
              >
                <Image
                  width={200}
                  height={240}
                  src={`${baseImageUrl + item.poster_path}`}
                  alt={item.title}
                  aria-label={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
      </div>
      <h1 className="text-left w-full px-4 text-xl font-bold">
        Popular Series
      </h1>
      <div className="w-full movies flex gap-4 overflow-x-scroll p-4 py-1 ">
        {Array(10)
          .fill("")
          .map((_, i) => {
            return (
              <div
                key={i}
                className="border shrink-0 h-60 w-50 cursor-pointer duration-250 hover:scale-105 "
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default Main;
