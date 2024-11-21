import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { saveToStorage, getFromStorage } from "../utils/localstorage";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  // 로컬 스토리지에서 wishlist 데이터를 가져옵니다.
  const getWishlist = () => {
    const wishlist = getFromStorage("wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  };

  // Wishlist에서 영화 삭제 함수
  const removeFromWishlist = (movieId: number) => {
    // 현재 로컬 스토리지에서 wishlist 데이터를 가져옵니다.
    const updatedWishlist = getWishlist().filter(
      (movie: Movie) => movie.id !== movieId
    );
    // 삭제된 후 새로운 wishlist를 로컬 스토리지에 저장합니다.
    saveToStorage("wishlist", JSON.stringify(updatedWishlist));
    // 상태 업데이트
    setWishlist(updatedWishlist);
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 wishlist 데이터를 가져옵니다.
  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  return (
    <div>
      <Header />
      <div className="wishlist">
        <h2>My Wishlist</h2>
        <div className="wishlist-container">
          {wishlist.length > 0 ? (
            wishlist.map((movie) => (
              <div key={movie.id} className="movie-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  onClick={() => removeFromWishlist(movie.id)} // 이미지를 클릭하면 해당 영화를 삭제
                />
                <p>{movie.title}</p>
              </div>
            ))
          ) : (
            <p>찜한 영화가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
