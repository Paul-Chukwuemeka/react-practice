"use client";
import React, { use, useEffect, useState } from "react";
import HomeBtn from "../components/HomeBtn";
import { FaCloud, FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Image from "next/image";
import dayjs from "dayjs";
import Loader from "../components/loading";

const Page = () => {
  const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const forecastUrl = process.env.NEXT_PUBLIC_WEATHER_API_FORECAST_URL;
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getData(lat, long) {
    setLoading(true);
    try {
      if (lat && long) {
        const res = await axios.get(
          `${forecastUrl}?key=${key}&q=${lat},${long}&days=3`
        );
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function getSearchData(search) {
    setLoading(true);

    try {
      if (lat && long) {
        const res = await axios.get(
          `${forecastUrl}?key=${key}&q=${search}&days=3`
        );
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    try {
      getData(lat, long);
    } catch (error) {
      console.log(error);
    }
  }, [lat, long]);

  return (
    <div className="flex flex-col font-dynapuff gap-10 items-center justify-center p-20 text-white">
      <HomeBtn />
      {loading && <Loader />}
      <h1 className="text-2xl flex gap-1 items-center">
        Weather App <FaCloud />
      </h1>
      <div className="flex flex-col p-5 gap-5 items-center shadow-2xl bg-gray-800 h-full min-h-120 rounded-lg w-120">
        <div className="flex gap-3 items-center w-full p-4">
          <form
            className="flex-1 border flex p-2 rounded-4xl  gap-1 justify-between items-center"
            onSubmit={(e) => {
              e.preventDefault();
              getSearchData(search);
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="flex-1 focus:border-none px-2 focus:outline-none"
            />
            <button className="border px-5 cursor-pointer active:scale-95 hover:bg-gray-700 py-1.5 rounded-full">
              <FaSearch />
            </button>
          </form>
          <button
            className="flex gap-1 h-fit items-center bg-white p-2 rounded-4xl cursor-pointer hover:bg-gray-300 active:scale-95 text-black"
            onClick={() => {
              getData(lat, long);
            }}
          >
            Auto
            <FaLocationDot />
          </button>
        </div>
        <div className="border-y-2 p-5 gap-3 w-full min-h-40 h-fit flex flex-col items-center justify-center">
          <h1 className="text-2xl">
            📍{data ? data.location.name : "Loading..."},{" "}
            {data ? data.location.country : "Loading..."}
          </h1>
          <h2 className="text-xl flex items-center gap-1">
            {data ? (
              <>
                <Image
                  src={"https:" + data.current.condition.icon}
                  width={50}
                  height={50}
                  alt="Weather Icon"
                />
                <p>{data.current.condition.text}</p>
              </>
            ) : (
              <>
                <FaCloud /> Loading...
              </>
            )}
          </h2>
          <h2 className="text-xl">
            🌡️ {data ? data.current.temp_c : "Loading..."} °C
          </h2>
          <div className="flex gap-6 text-xl">
            <h2>💧 {data ? data.current.humidity + " g/m³" : "Loading..."}</h2>
            <h2>💨 {data ? data.current.wind_kph + " km/h" : "Loading..."}</h2>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-center">3-day Forecast</h1>
          <div className="flex forecast p-1 gap-1 overflow-x-scroll  w-full h-35 mt-2">
            {data ? (
              data.forecast.forecastday.map((day, index) => {
                return (
                  <div
                    key={index}
                    className="shrink-0 border-2 w-50 flex items-center justify-center flex-col"
                  >
                    <h1 className="text-lg">
                      {dayjs(day.date).format("dddd")}
                    </h1>
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        src={day && "https:" + day.day.condition.icon}
                        width={40}
                        height={40}
                        alt={day.day.condition.text}
                      />
                      <h1>{day && day.day.condition.text}</h1>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="w-120 border-none text-center">Loading....</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/*


tools - api
*/
export default Page;
