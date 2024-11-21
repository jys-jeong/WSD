import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validation";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate 임포트

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }
    const success = await signIn(email, password);
    if (!success) {
      alert("로그인 실패!");
      return;
    }

    // 로그인 성공 시 홈 페이지로 리디렉션
    navigate("/");
  };

  return (
    <AuthForm title="로그인" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="아이디 (이메일)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
};

export default SignIn;
