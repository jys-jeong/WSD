import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getWishlist, toggleWishlist } from "../utils/toggleWishlist";
import MovieItem from "../components/MovieItem";
import { Movie } from "../types/Movie";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  // 컴포넌트 마운트 시 로컬 스토리지에서 wishlist 데이터를 가져옵니다.
  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  return (
    <div>
      <Header />
      <div className="wishlist">
        <h2>나의 찜 리스트</h2>
        <div className="wishlist-container">
          {wishlist.length > 0 ? (
            wishlist.map((movie) => (
              <MovieItem
                key={movie.id}
                movie={movie}
                onToggleWishlist={(movie) =>
                  toggleWishlist(movie, wishlist, setWishlist)
                }
              />
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
