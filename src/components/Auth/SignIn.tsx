// src/components/Auth/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 사용
import { useAuth } from "../../hooks/useAuth";
import { saveToStorage } from "../../utils/localstorage";
interface SignInProps {
  onToggle: () => void; // 로그인/회원가입 전환 함수
}

const SignIn: React.FC<SignInProps> = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(email, password);
    if (success) {
      saveToStorage("TMDb-Key", password);
      alert("로그인 성공!");
      navigate("/"); // 로그인 성공 시 홈 페이지로 이동
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">로그인</button>
      <button type="button" onClick={onToggle}>
        회원가입 화면으로
      </button>
    </form>
  );
};

export default SignIn;
