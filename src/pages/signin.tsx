// src/pages/AuthPage.tsx
import React, { useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/Signup";
import "../assets/styles/AuthForm.css";

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true); // 애니메이션 시작
    setTimeout(() => {
      setIsSignIn(!isSignIn); // 상태 전환
      setIsAnimating(false); // 애니메이션 종료
    }, 500); // 애니메이션 지속 시간 (0.5초)
  };

  return (
    <div className="auth-page">
      {isSignIn ? (
        <SignIn
          onToggle={handleToggle}
          className={`form-container ${
            isAnimating ? "animating-out" : "visible"
          }`}
        />
      ) : (
        <SignUp
          onToggle={handleToggle}
          className={`form-container ${
            isAnimating ? "animating-out" : "visible"
          }`}
        />
      )}
    </div>
  );
};

export default AuthPage;
