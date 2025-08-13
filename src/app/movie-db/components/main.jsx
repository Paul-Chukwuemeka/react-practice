"use client";
import React, { use } from "react";
import AppContext from "@/contexts/contexts";
import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import useFetchPopular from "@/hooks/usefetchPopular";
import useFetchTrendingMovies from "@/hooks/usefetchTrending";
import Loading from "./loading";

const Main = () => {
  const { darkMode } = useContext(AppContext);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [position, setPosition] = useState(0);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const banner = useRef(null);

  const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  useEffect(() => {
    async function getData() {
      setIsPopularLoading(true)
      const response = await useFetchPopular();
      setPopular(response);
      setIsPopularLoading(false);
    }
    getData();
    async function getTrending() {
      setIsTrendingLoading(true);
      const response = await useFetchTrendingMovies();
      let value = [...response, response[0]];
      setTrending(value);
      setIsTrendingLoading(false);
    }

    getTrending();
  }, []);

  useEffect(() => {
    const scroll = setInterval(() => {
      if (banner.current) {
        setPosition(
          (prev) =>
            (prev + banner.current.clientWidth) %
            (trending.length * banner.current.clientWidth)
        );
      }
    }, 1000);
    return () => clearInterval(scroll);
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
      <div
        className=" h-100 w-full  max-w-300 overflow-hidden "
        ref={banner}
      >
        {isTrendingLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <div
            className={`flex *:shrink-0 h-100 w-fit  ${
              position === 0 ? "duration-0 transition-none" : "duration-300"
            }`}
            style={{ transform: `translateX(-${position}px)` }}
          >
            {trending &&
              trending.map((item, i) => {
                return (
                  <Image
                    key={i}
                    src={baseImageUrl + item.backdrop_path}
                    width={1200}
                    height={400}
                    alt=""
                    aria-label=""
                    className="w-full h-full object-fill"
                  />
                );
              })}
          </div>
        )}
      </div>
      <h1 className="text-left px-4 w-full text-xl font-bold">
        Popular Movies
      </h1>
      <div className="w-full movies flex gap-4 overflow-x-scroll p-4 py-1 ">
        {isPopularLoading
          ? Array(10)
              .fill("")
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className=" border duration-250 cursor-pointer shrink-0 h-70 w-50"
                  >
                    <Loading />
                  </div>
                );
              })
          : popular &&
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
