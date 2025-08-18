import React, { useEffect, useState } from "react";
import useGetMoviesByGenre from "@/hooks/useGetMoviesByGenre";
import Loading from "../loading";
import Image from "next/image";

const ComedyMovies = () => {
  const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  const [actionList, setActionList] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    async function getRes() {
      try {
        const res = await useGetMoviesByGenre(35);
        setActionList(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getRes();
  }, []);
  return (
    <div className="w-full overflow-hidden">
      <h1 className="text-left w-full px-4 py-2 text-3xl font-bold">Comedy</h1>
      <div className="w-full movies flex gap-4 overflow-x-scroll p-4 py-1 ">
        {loading
          ? Array(10)
              .fill("")
              .map((_, i) => {
                return (
                  <div key={i}>
                    <Loading />
                  </div>
                );
              })
          : actionList &&
            actionList.map((item, i) => {
              return (
                <div
                  className="text-center w-50 hover:scale-105 duration-250"
                  key={i}
                >
                  <div className=" relative  cursor-pointer  shrink-0 h-70 w-50">
                    <Image
                      width={200}
                      height={240}
                      src={`${baseImageUrl + item.poster_path}`}
                      alt={item.title}
                      priority
                      aria-label={item.title}
                      className="w-full flex-1 h-auto object-cover"
                    />
                  </div>
                  <p className="text-white font-semibold truncate  text-xl h-10 w-full text-ellipsis backdrop-blur-3xl">
                    {item.title}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ComedyMovies;
