import React, { useRef, useState, useEffect } from "react";
import useFetchMovies from "../../hooks/useFetchMovies";
import "../../assets/styles/MovieList.css";
import { Movie } from "../../types/Movie";
import { toggleWishlist } from "../../utils/toggleWishlist";
import MovieItem from "../MovieItem";

interface MovieListProps {
  category: string;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ category, title }) => {
  const { movies, loading, error } = useFetchMovies(category);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true); // 왼쪽 버튼 비활성화 상태
  const [isRightDisabled, setIsRightDisabled] = useState(false); // 오른쪽 버튼 비활성화 상태

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  // 스크롤 위치 확인 후 버튼 상태 업데이트
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setIsLeftDisabled(scrollLeft === 0);
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      handleScroll(); // 초기 버튼 상태 업데이트
      sliderRef.current.addEventListener("scroll", handleScroll);

      return () =>
        sliderRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [movies]); // movies가 업데이트될 때마다 스크롤 상태 체크

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list-container">
      <h2>{title}</h2>
      <div className="movie-slider-wrapper">
        <button
          className="scroll-button left"
          onClick={scrollLeft}
          disabled={isLeftDisabled}
        >
          {"<"}
        </button>
        <div className="movie-slider" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggleWishlist={(movie) =>
                toggleWishlist(movie, wishlist, setWishlist)
              }
            />
          ))}
        </div>
        <button
          className="scroll-button right"
          onClick={scrollRight}
          disabled={isRightDisabled}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MovieList;
