import axios from "axios";

const API_KEY = "8767bdf177f7fc3c69a7cb214f80a52e";
const BASE_URL = "https://api.themoviedb.org/3";

export class TMDB {
  fetchMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, language: "ko-KR" },
      });
      console.log(response.data);
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  };
  getNowPlaying = async (apiKey: string, page: number = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  };
  getPopular = async (apiKey: string, page: number = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  };
  getAction = async (apiKey: string, page: number = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
    }
  };
}
export const tmdb = new TMDB();
