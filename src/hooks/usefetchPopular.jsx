"use client";
import tmdb from "@/api/tmdb";

export default async function fetchPopular() {
  try {
    const res = await tmdb.get("/movie/popular");
    return res.data.results;
  } catch (error) {
    return error;
  }
}
