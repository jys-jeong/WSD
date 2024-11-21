import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "./AuthForm";
import { isValidEmail } from "../../utils/validation";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = await signUp(email, password);
    if (!success) alert("회원가입 실패!");
  };

  return (
    <AuthForm title="회원가입" onSubmit={handleSubmit}>
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </AuthForm>
  );
};

export default SignUp;
