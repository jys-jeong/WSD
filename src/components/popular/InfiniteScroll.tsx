import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL"; // TMDB 클래스를 임포트
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "./TopButton"; // "Back to Top" 버튼 컴포넌트

const InfiniteMovieList = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedMovies = await tmdb.fetchMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
      setLoading(false);
    };
    fetchMovies();
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

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

  return (
    <div>
      <h2>Popular Movies</h2>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={!loading}
        loader={<p>Loading...</p>}
        endMessage={<p>No more movies</p>}
        scrollThreshold={0.95}
        scrollableTarget="movie-list"
      >
        <div className="movie-list" id="movie-list">
          {movies.map((movie: any) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {loading && <p>Loading more movies...</p>}

      {showTopButton && <TopButton />}
    </div>
  );
};

export default InfiniteMovieList;
