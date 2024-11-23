import React, { useEffect, useState } from "react";
import PageMovieList from "../components/popular/MovieList";
import InfiniteMovieList from "../components/popular/InfiniteScroll";
import { tmdb } from "../utils/URL";
import Header from "../components/Header";

export const Popular: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [viewMode, setViewMode] = useState<"page" | "infinite">("page"); // 현재 뷰 모드
  const [loading, setLoading] = useState(false);
  // API에서 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await tmdb.fetchMovies(currentPage);
        setMovies(response.results); // 현재 페이지 영화 데이터
        setTotalPages(response.total_pages); // 총 페이지 수 저장
        setLoading(false);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMovies();
  }, [currentPage]); // currentPage 변경 시 호출

  return (
    <div>
      <Header />
      <header>
        <h1>영화 목록</h1>
      </header>
      <div className="view-toggle">
        {/* 버튼으로 뷰 모드 전환 */}
        <button onClick={() => setViewMode("page")}>Page View</button>
        <button onClick={() => setViewMode("infinite")}>Infinite Scroll</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-list-container">
          {/* 현재 뷰 모드에 따라 컴포넌트 렌더링 */}
          {viewMode === "page" ? <PageMovieList /> : <InfiniteMovieList />}
        </div>
      )}
    </div>
  );
};

export default Popular;
