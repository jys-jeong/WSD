// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Header.css"; // 스타일 파일 임포트

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Logo"
            className="header__logoImage"
          />
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
        <Link to="/signin">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Avatar_icon.png"
            alt="Profile"
            className="header__profileImage"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
