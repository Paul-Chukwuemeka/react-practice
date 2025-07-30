"use client";
import { use, useEffect, useState } from "react";
import Values from "values.js";
import { ToastContainer, toast } from "react-toastify";
import HomeBtn from "../components/HomeBtn";

const Page = () => {
  const [colorsArr, setColorsArr] = useState(null);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("white");
  const [errMssg, setErrMssg] = useState("");

  const notifyErr = () => toast.error(errMssg);
  const notifySucces = () => toast.success("Color Copied to clipBoard");

  useEffect(() => {
    try {
      const res = new Values(color).all(10);
      setColorsArr(res);
    } catch (error) {
      setErrMssg(error.message);
    }
  }, [color]);

  useEffect(() => {
    if (errMssg !== "") {
      notifyErr();
    }
  }, [errMssg]);
  return (
    <div className="p-20 text-white  ">
      <HomeBtn/>
      <ToastContainer />
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 text-4xl m-auto my-2 to-pink-500 w-fit">
        Color Generator
      </h1>
      <form
        className="mb-10 border m-auto p-2 w-130 rounded-lg gap-2 flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          setColor(input);
        }}
      >
        <input
          type="color"
          name=""
          id=""
          className="h-12"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <input
          type="text"
          value={input}
          className="flex-1 h-12 focus:border-none focus:bg-[#8080803e] p-1 outline-none"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <input
          type="submit"
          className="h-12 hover:bg-blue-200 duration-500 cursor-pointer hover:text-black rounded-lg w-30 border"
        />
      </form>
      <div className="grid max-w-[1200px] shrink-0 h-full m-auto max-xl:grid-cols-4 xl:grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 gap-2 max-sm:grid-cols-1">
        {colorsArr &&
          colorsArr.map((color, index) => {
            let colorstr = `rgb(${color.rgb.join(",")})`;
            return (
              <div
                key={index}
                className={` h-40 p-5 text-lg font-semibold cursor-pointer active:scale-95 duration-500`}
                style={{
                  backgroundColor: colorstr,
                }}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText("#" + color.hex);
                    notifySucces();
                  } catch (error) {
                    setErrMssg(error.message);
                  }
                }}
              >
                <p
                  className={`${
                    color.weight >= 40 && color.type === "tint"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {color.weight}%
                </p>
                <p
                  className={`${
                    color.weight >= 40 && color.type === "tint"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  #{color.hex}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
