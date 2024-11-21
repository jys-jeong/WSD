// /src/routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
// import SignUp from "./pages/signup";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import Wishlist from "./pages/wishlist";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/popular" element={<Popular />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default AppRoutes;
