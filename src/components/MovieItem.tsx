import React, { useEffect, useState } from "react";
import { Movie, MovieItemProps } from "../types/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { getFromStorage } from "../utils/localstorage";
const MovieItem: React.FC<MovieItemProps> = ({ movie, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  const email = getFromStorage("email") || ""; // 실제 이메일로 변경해야 함

  // 로컬스토리지에서 email을 기준으로 wishlist를 확인하여 해당 영화가 있는지 확인
  useEffect(() => {
    const wishlist = JSON.parse(getFromStorage("wishlist") || "{}");
    const userWishlist = wishlist[email] || [];
    setIsInWishlist(userWishlist.some((item: Movie) => item.id === movie.id)); // 영화 ID로 비교
  }, [movie.id, email]);

  const handleToggleWishlist = () => {
    onToggleWishlist(movie, email); // 이메일을 함께 전달하여 wishlist를 업데이트
    setIsInWishlist((prev) => !prev); // 클릭 시 상태 토글
  };

  return (
    <div className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={handleToggleWishlist}
      />

      {isInWishlist && (
        <FontAwesomeIcon
          icon={faBookmark}
          size="2x"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#e50914", // 원하는 색상으로 변경
          }}
        />
      )}

      <div className="movie-overlay" onClick={handleToggleWishlist}>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">
          평점 {Math.round(movie.vote_average * 10) / 10}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
