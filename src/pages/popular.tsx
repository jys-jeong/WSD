import React, { useEffect, useState } from "react";
import MovieList from "../components/popular/MovieList";

import InfiniteMovieList from "../components/popular/InfiniteScroll";
import { tmdb } from "../utils/URL";
import Header from "../components/Header";
const Popular: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  // API에서 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdb.fetchMovies(currentPage);
        setMovies(response); // 현재 페이지 영화 데이터
        setTotalPages(response.total_pages); // 총 페이지 수 저장
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
      <MovieList /> {/* 현재 페이지 데이터 전달 */}
    </div>
  );
};

export default Popular;
