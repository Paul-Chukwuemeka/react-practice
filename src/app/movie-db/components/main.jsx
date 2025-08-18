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
import Slider from "./slider";
import Link from "next/link";

const Main = () => {
  const { darkMode } = useContext(AppContext);
  const [trending, setTrending] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);

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
      <Slider trending={trending} isTrendingLoading={isTrendingLoading} />
      <Popular />
      <ActionMovies />
      <AnimationMovies />
      <ScifiMovies />
      <ComedyMovies />
    </div>
  );
};

export default Main;
