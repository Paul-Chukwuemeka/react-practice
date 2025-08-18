import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "./loading";
import useFetchPopular from "@/hooks/usefetchPopular";
import Image from "next/image";

const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

const Popular = () => {
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsPopularLoading(true);
      const response = await useFetchPopular();
      setPopular(response);
      setIsPopularLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="w-full overflow-hidden">
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
          : popular && popular.map((item, i) => {
              return (
                <div className="w-50 hover:scale-105" key={i}>
                  <div className=" duration-250 cursor-pointer  shrink-0 h-70 w-50">
                    <Image
                      width={200}
                      height={240}
                      src={`${baseImageUrl + item.poster_path}`}
                      alt={item.title}
                      priority
                      aria-label={item.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <p className="w-full p-1 font-bold backdrop-blur-2xl text-lg truncate">
                    {item.title}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Popular;
