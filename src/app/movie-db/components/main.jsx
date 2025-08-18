"use client";
import AppContext from "@/contexts/contexts";
import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import useFetchPopular from "@/hooks/usefetchPopular";
import useFetchTrendingMovies from "@/hooks/usefetchTrending";

import Loading from "./loading";
import { FaPlay } from "react-icons/fa6";
import ActionMovies from "./genres/actionMovies";
import AnimationMovies from "./genres/animationMovies";
import ComedyMovies from "./genres/comedyMovies";
import ScifiMovies from "./genres/sci_fi";
import Popular from "./popular";

const Main = () => {
  const { darkMode } = useContext(AppContext);
  const [trending, setTrending] = useState([]);
  const [currentTrending, setCurrentTrending] = useState(0);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const banner = useRef(null);

  const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  useEffect(() => {

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
    if (trending.length == 0) return;

    const interval = setInterval(() => {
      setCurrentTrending((prev) =>
        prev >= trending.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
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
        className=" h-120 w-full relative max-w-300 overflow-hidden"
        ref={banner}
      >
        <div className="w-full flex flex-col  justify-between h-full absolute z-40 p-10  bg-[#ffffff00]">
          <h1 className="bg-black/40 backdrop-blur-sm text-3xl font-bold text-white px-3 py-1 rounded-lg w-fit">
            {trending[currentTrending]?.title}
          </h1>
          <button className="flex items-center text-xl w-fit p-2 gap-1">
            Watch Now <FaPlay />
          </button>
        </div>
        {isTrendingLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <div
            className={`flex *:shrink-0 h-120 w-fit  
              ${currentTrending == 0 ? "duration-0" : "duration-300"} 
            `}
            style={{
              transform: `translateX(-${
                currentTrending *
                (banner.current.clientWidth ? banner.current.clientWidth : 0)
              }px)`,
            }}
          >
            {trending &&
              trending.map((item, i) => {
                return (
                  <Image
                    key={i}
                    src={baseImageUrl + item.backdrop_path}
                    width={1200}
                    height={480}
                    priority
                    alt=""
                    aria-label=""
                    className="w-full h-full "
                  />
                );
              })}
          </div>
        )}
      </div>
      <Popular/>
     <ActionMovies/>
     <AnimationMovies/>
     <ScifiMovies/>
     <ComedyMovies/>
    </div>
  );
};

export default Main;
