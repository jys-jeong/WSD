import React, { useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/Signup";
import "../assets/styles/AuthForm.css";

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true); // 현재 상태 (SignIn 또는 SignUp)
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태

  const handleToggle = () => {
    setIsAnimating(true); // 애니메이션 시작
    setTimeout(() => {
      setIsSignIn((prev) => !prev); // 상태 전환 (SignIn -> SignUp, 또는 그 반대)
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
