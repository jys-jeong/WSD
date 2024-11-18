import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { calculateLayout } from "../..//utils/calculateLayout";
import "../../assets/styles/MovieGrid.css";

const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = "8767bdf177f7fc3c69a7cb214f80a52e";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [rowSize, setRowSize] = useState(4);

  const fetchMovies = async () => {
    try {
      const totalMoviesNeeded = 120;
      const numberOfPages = Math.ceil(totalMoviesNeeded / 20);
      let allMovies: Movie[] = [];

      for (let page = 1; page <= numberOfPages; page++) {
        const response = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            page,
          },
        });
        allMovies = [...allMovies, ...response.data.results];
      }

      setMovies(allMovies.slice(0, totalMoviesNeeded));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // 창 크기 변화에 따라 레이아웃 계산
  const handleResize = useCallback(() => {
    const { rowSize, moviesPerPage } = calculateLayout();
    setRowSize(rowSize);
    setMoviesPerPage(moviesPerPage);
  }, []);

  // 초기 데이터 fetch 및 창 크기 감지
  useEffect(() => {
    fetchMovies();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // 현재 페이지의 영화 데이터 계산
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className="movie-grid-container">
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(movies.length / moviesPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MovieList;
