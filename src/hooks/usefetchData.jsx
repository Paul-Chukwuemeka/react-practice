"use client";
import axios from "axios";

async function useFetchData() {
  const token = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
  const url = process.env.NEXT_PUBLIC_TMDB_DISCOVER_URL;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
        language: "en-US",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export default useFetchData;
