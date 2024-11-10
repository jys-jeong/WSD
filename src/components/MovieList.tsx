import React, { useRef } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import "../assets/styles/MovieList.css";

interface MovieListProps {
  category: string;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ category, title }) => {
  const { movies, loading, error } = useFetchMovies(category);
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
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-overlay">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-rating">Rating: {movie.vote_average}</p>
                <p className="movie-release-date">
                  Release Date: {movie.release_date}
                </p>
              </div>
            </div>
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
