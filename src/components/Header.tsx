// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import { removeFromStorage } from "../utils/localstorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faUser } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // 헤더 표시 상태
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태

  useEffect(() => {
    // 1초 후 헤더를 나타내기 위한 타이머
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // 스크롤 50px 이상이면 배경 색 변경
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  const handleSignOut = () => {
    removeFromStorage("TMDb-Key");
    alert("로그아웃되었습니다.");
    navigate("/signin");
  };

  return (
    <header
      className={`header ${isVisible ? "show" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="header__logo"></div>
      <nav className="header__nav">
        <Link to="/" className="header__navItem">
          <FontAwesomeIcon icon={faFilm} size="2x" style={{ color: "red" }} />
        </Link>
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
          <FontAwesomeIcon icon={faUser} size="2x" style={{ color: "white" }} />
        </button>
      </div>
    </header>
  );
};

export default Header;
