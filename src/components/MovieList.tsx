import React, { useRef } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import "../assets/styles/MovieList.css";

const MovieList: React.FC = () => {
  const { movies, loading, error } = useFetchMovies();
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list-container">
      <h2>지금 뜨는</h2>
      <div className="slider-buttons">
        <button className="slide-button left" onClick={slideLeft}>
          &lt;
        </button>
        <button className="slide-button right" onClick={slideRight}>
          &gt;
        </button>
      </div>
      <div className="movie-slider" ref={sliderRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
