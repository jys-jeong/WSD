import React from "react";

interface FilterBarProps {
  onGenreChange: (genre: string | null) => void;
  onRatingChange: (rating: number | null) => void;
  onSortByChange: (sortBy: string) => void;
  onSortDirectionChange: (sortDirection: string) => void; // 추가
}

const FilterBar: React.FC<FilterBarProps> = ({
  onGenreChange,
  onRatingChange,
  onSortByChange,
  onSortDirectionChange, // 추가
}) => {
  return (
    <div className="filter-bar">
      {/* 장르 필터 */}
      <select onChange={(e) => onGenreChange(e.target.value || null)}>
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="18">Drama</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="80">Crime</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
      </select>

      {/* 평점 필터 */}
      <select onChange={(e) => onRatingChange(Number(e.target.value) || null)}>
        <option value="">All Ratings</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>

      {/* 정렬 기준 필터 */}
      <select onChange={(e) => onSortByChange(e.target.value)}>
        <option value="popularity">Popularity</option>
        <option value="release_date">Release Date</option>
        <option value="vote_average">Vote Average</option>
      </select>

      {/* 정렬 방향 필터 */}
      <select onChange={(e) => onSortDirectionChange(e.target.value)}>
        {" "}
        {/* 추가 */}
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default FilterBar;
