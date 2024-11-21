const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const fetchTMDB = async (endpoint: string, options: any = {}) => {
  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("API 호출 실패");
  }

  return response.json();
};
