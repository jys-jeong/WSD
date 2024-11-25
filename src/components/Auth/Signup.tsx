// src/components/Auth/SignUp.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validation";

interface SignUpProps {
  onToggle: () => void;
  className: string;
}

const SignUp: React.FC<SignUpProps> = ({ onToggle, className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("약관에 동의해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = await signUp(email, password);
    const validEmail = isValidEmail(email);

    if (success && validEmail) {
      alert("회원가입 성공!");
      onToggle();
    } else {
      alert("회원가입 실패!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        약관에 동의합니다.{" "}
      </label>
      <button type="submit">회원가입</button>
      <button type="button" onClick={onToggle}>
        로그인하기
      </button>
    </form>
  );
};

export default SignUp;
