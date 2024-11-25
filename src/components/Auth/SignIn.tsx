// src/components/Auth/SignIn.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
} from "../../utils/localstorage";
import { isValidEmail } from "../../utils/validation";

interface SignInProps {
  onToggle: () => void;
  className: string;
}

const SignIn: React.FC<SignInProps> = ({ onToggle, className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = getFromStorage("remembered-email");
    const rememberStatus = getFromStorage("remember-me") === "true";
    if (savedEmail && rememberStatus) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await signIn(email, password);
    const validEmail = isValidEmail(email);

    if (success && validEmail) {
      saveToStorage("TMDb-Key", password);
      if (rememberMe) {
        saveToStorage("remembered-email", email);
        saveToStorage("remember-me", "true");
      } else {
        removeFromStorage("remembered-email");
        saveToStorage("remember-me", "false");
      }
      navigate("/");
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        아이디 저장
      </label>
      <button type="submit">로그인</button>
      <button type="button" onClick={onToggle}>
        회원가입하기
      </button>
    </form>
  );
};

export default SignIn;
