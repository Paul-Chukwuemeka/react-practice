import tmdb from "@/api/tmdb";

const useFetchTrending = async () => {
  const res = await tmdb.get("/trending/all/day");
  return res.data.results
};

export default useFetchTrending;
