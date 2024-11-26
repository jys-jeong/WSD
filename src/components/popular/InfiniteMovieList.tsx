import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL";
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "../TopButton";
import MovieItem from "../MovieItem";
import { Movie } from "../../types/Movie"; // Movie 타입을 가져옵니다.
import { toggleWishlist } from "../../utils/toggleWishlist";
import ScrollGuide from "../ScrollGuide"; // ScrollGuide 컴포넌트 임포트
import "../../assets/styles/Infinite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const InfiniteMovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Movie[] 타입으로 지정
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

      // 중복되지 않는 영화만 추가
      setMovies((prevMovies) => {
        const newMovies = fetchedMovies.filter(
          (movie: Movie) =>
            !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

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
            <div>
              <MovieItem
                key={movie.id}
                movie={movie}
                onToggleWishlist={(movie) =>
                  toggleWishlist(movie, wishlist, setWishlist)
                }
              />
              <p className="movie-title1">{movie.title}</p>
              {/* 평점과 아이콘을 나란히 배치 */}
              <div className="vote">
                <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
                <p className="votenum">
                  {Math.round(movie.vote_average * 10) / 10}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {showTopButton && <TopButton />}
    </div>
  );
};

export default InfiniteMovieList;
