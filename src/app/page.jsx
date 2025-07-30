import { TbNumber123,TbQuote,TbColorPicker,TbCloud } from "react-icons/tb";
import Link from "next/link";

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
      </div>
    </div>
  );
}

export default Home;
