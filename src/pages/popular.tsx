import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCellsLarge, faBars } from "@fortawesome/free-solid-svg-icons";
import PageMovieList from "../components/popular/PageMovieList";
import InfiniteMovie from "../components/popular/InfiniteMovieList";
import { tmdb } from "../utils/URL";
import Header from "../components/Header";
import "../assets/styles/Popular.css";
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
      <div className="view-toggle">
        {/* 버튼으로 뷰 모드 전환 */}
        <button onClick={() => setViewMode("page")} className="view-toggle-btn">
          <FontAwesomeIcon icon={faTableCellsLarge} />
        </button>
        <button
          onClick={() => setViewMode("infinite")}
          className="view-toggle-btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-list-container">
          {/* 현재 뷰 모드에 따라 컴포넌트 렌더링 */}
          {viewMode === "page" ? <PageMovieList /> : <InfiniteMovie />}
        </div>
      )}
    </div>
  );
};

export default Popular;
