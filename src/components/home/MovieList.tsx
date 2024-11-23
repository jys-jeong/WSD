import React, { useRef, useState } from "react";
import useFetchMovies from "../../hooks/useFetchMovies";
import "../..//assets/styles/MovieList.css";
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
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list-container">
      <h2>{title}</h2>
      <div className="movie-slider-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>
          {"<"}
        </button>
        <div className="movie-slider" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggleWishlist={(movie) => toggleWishlist(movie, setWishlist)}
            />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MovieList;
