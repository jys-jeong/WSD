import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import { calculateLayout } from "../../utils/calculateLayout";
import "../../assets/styles/MovieGrid.css";
import { toggleWishlist } from "../../utils/toggleWishlist";
import { Movie } from "../../types/Movie";
import MovieItem from "../MovieItem";
import { tmdb } from "../../utils/URL";

const PageMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [wishlist, setWishlist] = useState<Movie[]>([]); // 위시리스트 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [rowSize, setRowSize] = useState(4);
  const [loading, setLoading] = useState(false);

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async () => {
    try {
      const response = await tmdb.fetchMovies(currentPage);
      setMovies(response);
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
    setLoading(true);
    fetchMovies();
    handleResize();
    setLoading(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, currentPage]);

  return (
    <div className="movie-grid-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggleWishlist={(movie) => toggleWishlist(movie, setWishlist)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={30} // 임의의 총 페이지 수
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PageMovieList;
