// src/pages/AuthPage.tsx
import React, { useState } from "react";
import AuthForm from "../components/Auth/AuthForm";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/Signup";

const AuthPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <AuthForm>
      {isSignIn ? (
        <SignIn onToggle={handleToggle} />
      ) : (
        <SignUp onToggle={handleToggle} />
      )}
    </AuthForm>
  );
};

export default AuthPage;
