import axios from "axios";

const API_KEY = "8767bdf177f7fc3c69a7cb214f80a52e";
const BASE_URL = "https://api.themoviedb.org/3";

export class TMDB {
  fetchMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, language: "ko-KR" },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  };

  getNowPlaying = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: { api_key: API_KEY, language: "ko-KR" },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      return [];
    }
  };

  getTop_Rated = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: { api_key: API_KEY, language: "ko-KR", page: 2 },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      return [];
    }
  };

  getUpcoming = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}'`,
        {
          params: { api_key: API_KEY, language: "ko-KR" },
        }
      );
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch action movies:", error);
      return [];
    }
  };
}

export const tmdb = new TMDB();
