import { useEffect, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa6";
import Loading from "./loading";
import Image from "next/image";

const baseImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

function Slider({ trending, isTrendingLoading }) {
  const banner = useRef(null);

  const [currentTrending, setCurrentTrending] = useState(0);

  useEffect(() => {
    if (trending.length == 0) return;

    const interval = setInterval(() => {
      setCurrentTrending((prev) =>
        prev >= trending.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [trending]);

  return (
    <div
      className=" h-160 w-full max-lg:h-120 relative max-w-400 overflow-hidden"
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
          className={`flex *:shrink-0 h-160 w-fit  
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
                  className="w-full h-full object-fit "
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Slider;
