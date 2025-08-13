import tmdb from "@/api/tmdb";

const useFetchTrendingMovies = async () => {
  try {
    const res = await tmdb.get("/trending/movie/day");
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

export default useFetchTrendingMovies;
