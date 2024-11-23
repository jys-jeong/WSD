import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validation";

interface SignUpProps {
  onToggle: () => void; // 로그인/회원가입 전환 함수
}

const SignUp: React.FC<SignUpProps> = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false); // 약관 동의 상태 관리
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 약관 동의 확인
    if (!agreeTerms) {
      alert("회원가입을 위해 약관에 동의해주세요.");
      return;
    }

    const validEmail = await isValidEmail(email);
    const success = await signUp(email, password);

    if (success && validEmail) {
      alert("회원가입 성공!");
      onToggle(); // 회원가입 성공 시 로그인 화면으로 전환
    } else {
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(e.target.checked);
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
      <label>
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={handleAgreeTermsChange}
        />
        약관에 동의합니다.{" "}
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          [약관 보기]
        </a>
      </label>
      <button type="submit">회원가입</button>
      <button type="button" onClick={onToggle}>
        로그인 화면으로
      </button>
    </form>
  );
};

export default SignUp;
