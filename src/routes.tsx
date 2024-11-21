import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import Wishlist from "./pages/wishlist";
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // ProtectedRoute 가져오기

const AppRoutes: React.FC = () => {
  const isAuthenticated = localStorage.getItem("TMDb-Key") !== null;

  return (
    <Routes>
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
  );
};

export default AppRoutes;
