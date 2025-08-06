import { TbNumber123, TbQuote, TbColorPicker, TbCloud } from "react-icons/tb";
import Link from "next/link";
import { MdMovie }  from "react-icons/md";


function Home() {
  return (
    <div className="h-full min-h-screen w-full p-20 flex flex-col items-center">
      <h1 className="text-size-header font-semibold text-[#1d3d9f]">
        Welcome to our React Projects Directory
      </h1>
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-subheader text-size-subheader ">
          Beginner Projects
        </h2>

        <Link href="/counter">
          <button className="p-4 w-50 flex gap-1 items-center justify-center bg-amber-500 text-white rounded-lg mt-2 cursor-pointer hover:bg-amber-600 active:scale-95 duration-450">
            Counter App <TbNumber123 />
          </button>
        </Link>
        <Link href={"/Quotes-Generator"}>
          <button className="p-4 w-50 flex gap-1 items-center justify-center bg-green-500 text-white rounded-lg mt-2 cursor-pointer hover:bg-green-600 active:scale-95 duration-450">
            Quotes Generator <TbQuote />
          </button>
        </Link>
        <Link href={"/color-picker"}>
          <button className="p-4 w-50 flex gap-1 items-center justify-center bg-red-500 text-white rounded-lg mt-2 cursor-pointer hover:bg-red-600 active:scale-95 duration-450">
            Color picker <TbColorPicker />
          </button>
        </Link>
        <Link href={"/Weather-App"}>
          <button className="p-4 w-50 flex gap-1 items-center justify-center bg-blue-500 text-white rounded-lg mt-2 cursor-pointer hover:bg-blue-600 active:scale-95 duration-450">
            Weather App <TbCloud />
          </button>
        </Link>
        <Link href={"/Decimal-to-binary"}>
          <button className="p-4 w-50 flex gap-1 items-center justify-center bg-pink-500 text-white rounded-lg mt-2 cursor-pointer hover:bg-pink-600 active:scale-95 duration-450">
            Decimal To Binary <TbCloud />
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-subheader text-size-subheader ">
          Intermediate Projects
        </h2>

        <Link href="/movie-db">
          <button className="p-4 w-50 flex gap-1 items-center justify-center bg-amber-500 text-white rounded-lg mt-2 cursor-pointer hover:bg-amber-600 active:scale-95 duration-450">
            Movie Database <MdMovie />
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default Home;
