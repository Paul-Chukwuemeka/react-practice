import tmdb from "@/api/tmdb";

const useGetMoviesByGenre = async (id) => {
  try {
    const res = await tmdb.get("/discover/movie", {
      params: {
        with_genres: id, 
      },
    });
    return res.data.results
  } catch (error) {
    return error;
  }
};

export default useGetMoviesByGenre;
