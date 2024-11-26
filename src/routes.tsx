import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/home";
import AuthPage from "./pages/signin";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import Wishlist from "./pages/wishlist";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute"; // ProtectedRoute 가져오기
import Toast from "./components/Auth/Toast"; // Toast 컴포넌트 임포트
import "./AppRoutes.css"; // transition 관련 CSS 파일 임포트

const AppRoutes: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Toast 메시지 상태
  const [toastType, setToastType] = useState<"success" | "error">("success"); // Toast 타입 상태
  const isAuthenticated =
    localStorage.getItem("email") !== null ||
    localStorage.getItem("isAuthenticated") !== null;
  const location = useLocation(); // 현재 위치를 가져옴

  // 로그인 상태 변경 콜백

  const handleLoginStatusChange = ({
    success,
    message,
  }: {
    success: boolean;
    message: string;
  }) => {
    setToastMessage(message); // 메시지 상태 업데이트
    setToastType(success ? "success" : "error"); // 타입 설정
  };

  const noTransitionRoutes = ["/signin"]; // 애니메이션 제외 경로

  const isTransitionEnabled = !noTransitionRoutes.includes(location.pathname);

  return (
    <div>
      <TransitionGroup className="page-transition-container">
        {isTransitionEnabled ? (
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <div>
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Home />
                    </ProtectedRoute>
                  }
                />
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
        ) : (
          <Routes location={location}>
            <Route
              path="/signin"
              element={
                <PublicRoute isAuthenticated={isAuthenticated} redirectTo="/">
                  <AuthPage onLoginStatusChange={handleLoginStatusChange} />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </TransitionGroup>

      {/* Toast 표시 */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
};

export default AppRoutes;
