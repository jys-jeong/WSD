import React from "react";
import useFetchBannerMovie from "../../hooks/useFetchBannerMovie";
import "../../assets/styles/Banner.css";

const Banner: React.FC = () => {
  const { movie, loading, error } = useFetchBannerMovie();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title}</h1>
        <p className="banner_description">{movie?.overview}</p>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
};

export default Banner;
