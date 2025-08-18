import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
    include_adult: false,
  },
});

tmdb.interceptors.response.use((response) => {
  try {
    if (response.config.url.includes("/movie/popular")) {
      response.data.results = response.data.results.slice(0, 10);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
});

export default tmdb;
