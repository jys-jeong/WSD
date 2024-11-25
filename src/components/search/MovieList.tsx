import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL";
import MovieItem from "../MovieItem";
import { toggleWishlist } from "../../utils/toggleWishlist";
import { Movie } from "../../types/Movie";
import Pagination from "../Pagination";
import ScrollGuide from "../popular/ScrollGuide";
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "../popular/TopButton";
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
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
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
        pageSize: 40,
      });
      if (fetchedMovies.length === 0) {
        setHasMore(false);
      }
      setMovies(fetchedMovies.results);
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage, genre, rating, sortBy, sortDirection]);

  // 페이지 변경 핸들러
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };
  return (
    <div className="movie-list-container">
      {/* 스크롤 안내 메시지 컴포넌트 추가 */}
      <ScrollGuide />

      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          loading && (
            <div className="loading-overlay">
              <p>로딩 중....</p>
            </div>
          )
        }
        scrollThreshold={1.0} // 스크롤이 끝에 도달할 때만 데이터 로드
        endMessage={<p>No more movies</p>}
      >
        <div className="movie-list">
          {movies.map((movie: Movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggleWishlist={(movie) => toggleWishlist(movie, setWishlist)}
            />
          ))}
        </div>
      </InfiniteScroll>

      {showTopButton && <TopButton />}
    </div>
  );
};

export default MovieList;
