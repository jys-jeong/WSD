// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import { getFromStorage, removeFromStorage } from "../utils/localstorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태
  const [email, setEmail] = useState<string | null>(null); // 사용자 이메일 상태

  useEffect(() => {
    // 사용자 이메일을 로컬스토리지에서 가져옴
    const storedEmail = getFromStorage("email");
    setEmail(storedEmail);

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

  const handleSignOut = async () => {
    signOut();
    removeFromStorage("TMDb-Key");
    removeFromStorage("email"); // 로그아웃 시 이메일도 제거
    alert("로그아웃되었습니다.");
    navigate("/signin");
  };

  return (
    <header className={`header show ${isScrolled ? "scrolled" : ""}`}>
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
        {/* 사용자 이메일 표시 */}
        {email && <span className="header__email">{email}님</span>}
        {/* 로그아웃 버튼 */}
        <button onClick={handleSignOut} className="header__profileButton">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size="2x"
            style={{ color: "white" }}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
