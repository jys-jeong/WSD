import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL";
import MovieItem from "../MovieItem";
import { toggleWishlist } from "../../utils/toggleWishlist";
import { Movie } from "../../types/Movie";
import Pagination from "../Pagination";
interface MovieListProps {
  genre: string | null;
  rating: number | null;
  sortBy: string;
  sortDirection: string; // 추가
}

const MovieList: React.FC<MovieListProps> = ({
  genre,
  rating,
  sortBy,
  sortDirection, // 추가
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  // 필터 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [genre, rating, sortBy, sortDirection]);

  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedMovies = await tmdb.filterMovies({
        page: currentPage,
        genre,
        rating,
        sortBy,
        sortDirection, // 추가
      });
      setMovies(fetchedMovies.results);
      setTotalPages(fetchedMovies.total_pages || 1);
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage, genre, rating, sortBy, sortDirection]);

  // 페이지 변경 핸들러

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-list">
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
        totalPages={totalPages} // 임의의 총 페이지 수
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MovieList;
