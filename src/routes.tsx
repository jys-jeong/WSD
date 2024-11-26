// /src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import Wishlist from "./pages/wishlist";
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // ProtectedRoute 가져오기
import "./AppRoutes.css"; // transition 관련 CSS 파일 임포트

const AppRoutes: React.FC = () => {
  const isAuthenticated = localStorage.getItem("TMDb-Key") !== null;
  const location = useLocation(); // 현재 위치를 가져옴

  return (
    <TransitionGroup className="page-transition-container">
      <CSSTransition key={location.key} timeout={500} classNames="page">
        <div>
          <Routes location={location}>
            {/* 공개 경로 */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />

            {/* 보호된 경로 */}
            <Route
              path="/popular"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Popular />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AppRoutes;
