import React from "react";
import { Movie, MovieItemProps } from "../types/Movie";

const MovieItem: React.FC<MovieItemProps> = ({ movie, onToggleWishlist }) => {
  return (
    <div className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={() => onToggleWishlist(movie)} // 영화 클릭 시 동작
      />
      <div className="movie-overlay" onClick={() => onToggleWishlist(movie)}>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">Rating: {movie.vote_average}</p>
        <p className="movie-release-date">Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieItem;
