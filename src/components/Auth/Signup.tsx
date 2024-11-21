// src/components/Auth/SignUp.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface SignUpProps {
  onToggle: () => void; // 로그인/회원가입 전환 함수
}

const SignUp: React.FC<SignUpProps> = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signUp(email, password);
    if (!success) alert("회원가입 실패!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
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
      <button type="submit">회원가입</button>
      <button type="button" onClick={onToggle}>
        로그인 화면으로
      </button>
    </form>
  );
};

export default SignUp;
