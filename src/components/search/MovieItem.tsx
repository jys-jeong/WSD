import React from "react";

interface MovieItemProps {
  movie: any;
}

// 로컬 스토리지에서 wishlist를 가져오는 함수
const getWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

// 로컬 스토리지에 영화 추가하는 함수
const addToWishlist = (movie: any) => {
  const wishlist = getWishlist();
  // 이미 존재하지 않는 경우에만 추가
  if (!wishlist.some((item: any) => item.id === movie.id)) {
    wishlist.push(movie);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${movie.title}가 찜 목록에 추가되었습니다!`);
  } else {
    alert(`${movie.title}는 이미 찜 목록에 있습니다.`);
  }
};

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <div className="movie-item">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={() => addToWishlist(movie)} // 영화 클릭 시 찜 목록에 추가
      />
      <p>{movie.title}</p>
    </div>
  );
};

export default MovieItem;
