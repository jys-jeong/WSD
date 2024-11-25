import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL";
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "./TopButton";
import "../../assets/styles/Infinite.css";
import MovieItem from "../MovieItem";
import { Movie } from "../../types/Movie";
import { toggleWishlist } from "../../utils/toggleWishlist";
const InfiniteMovieList = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedMovies = await tmdb.fetchMovies(page);

      if (fetchedMovies.length === 0) {
        setHasMore(false);
      }

      setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
      setLoading(false);
    };

    fetchMovies();
  }, [page]);

  // 스크롤 시 'Back to Top' 버튼 보이기
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

  // 스크롤이 끝에 도달했을 때 페이지 번호 증가
  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  return (
    <div>
      <h2>Popular Movies</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={loading && <p>Loading.....</p>}
        scrollThreshold={1.0} // 스크롤이 끝에 도달할 때만 데이터 로드
        endMessage={<p>No more movies</p>}
      >
        <div className="movie-list" id="movie-list">
          {movies.map((movie: Movie, index: number) => (
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

export default InfiniteMovieList;