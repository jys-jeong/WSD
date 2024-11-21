import React from "react";
import MovieList from "../components/home/MovieList";
import Banner from "../components/home/Banner";
import Header from "../components/Header";
const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <Banner />
      <MovieList category="now_playing" title="지금 뜨는 콘텐츠" />
      <MovieList category="top_rated" title="최고 평점 콘텐츠" />
      <MovieList category="upcoming" title="개봉 예정 콘텐츠" />
    </div>
  );
};

export default Main;
