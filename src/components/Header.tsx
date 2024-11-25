// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css"; // 스타일 파일 임포트
import { removeFromStorage } from "../utils/localstorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeFromStorage("TMDb-Key");
    alert("로그아웃되었습니다.");
    navigate("/signin"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <FontAwesomeIcon icon={faFilm} size="3x" style={{ color: "red" }} />
        </Link>
      </div>
      <nav className="header__nav">
        <Link to="/" className="header__navItem">
          홈
        </Link>
        <Link to="/popular" className="header__navItem">
          대세 콘텐츠
        </Link>
        <Link to="/search" className="header__navItem">
          찾아보기
        </Link>
        <Link to="/wishlist" className="header__navItem">
          내게 찜한 리스트
        </Link>
      </nav>
      <div className="header__profile">
        {/* 로그아웃 버튼 추가 */}
        <button
          onClick={handleSignOut}
          className="header__profileButton"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Avatar_icon.png"
            alt="Profile"
            className="header__profileImage"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
