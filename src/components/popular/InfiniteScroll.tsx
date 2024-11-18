import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL"; // TMDB 클래스를 임포트
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "./TopButton"; // "Back to Top" 버튼 컴포넌트
import "../../assets/styles/Infinite.css";
const MovieList = () => {
  const [movies, setMovies] = useState<any[]>([]); // 영화 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부
  const [showTopButton, setShowTopButton] = useState(false); // "Back to Top" 버튼 상태

  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedMovies = await tmdb.fetchMovies(page);

      // 만약 데이터가 없다면, 더 이상 로드할 데이터가 없다고 설정
      if (fetchedMovies.length === 0) {
        setHasMore(false);
      }

      // 기존 데이터에 새로운 데이터를 추가
      setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
      setLoading(false);
    };

    fetchMovies();
  }, [page]); // 페이지가 바뀔 때마다 실행

  // 무한 스크롤을 위한 페이지 증가
  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  // 스크롤 시 "Back to Top" 버튼 보이기
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
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more movies</p>}
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

export default MovieList;
