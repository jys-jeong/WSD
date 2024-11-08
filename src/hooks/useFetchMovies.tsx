import { useEffect, useState } from "react";
import { tmdb } from "../utils/URL";
import { Movie } from "../types/Movie";

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await tmdb.fetchMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;
