import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 사용
import { useAuth } from "../../hooks/useAuth";
import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
} from "../../utils/localstorage";
import { isValidEmail } from "../../utils/validation";

interface SignInProps {
  onToggle: () => void; // 로그인/회원가입 전환 함수
}

const SignIn: React.FC<SignInProps> = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Remember me 상태 관리
  const { signIn } = useAuth();
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

  // 로컬 스토리지에서 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = getFromStorage("remembered-email");
    const rememberStatus = getFromStorage("remember-me") === "true"; // Boolean 상태 변환
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
      await saveToStorage("TMDb-Key", password);
      alert("로그인 성공!");

      // Remember me 설정
      if (rememberMe) {
        saveToStorage("remembered-email", email);
        saveToStorage("remember-me", "true");
      } else {
        removeFromStorage("remembered-email");
        saveToStorage("remember-me", "false");
      }

      navigate("/"); // 로그인 성공 시 홈 페이지로 이동
    } else {
      alert("로그인 실패!");
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
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
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMeChange}
        />
        아이디 저장
      </label>
      <button type="submit">로그인</button>
      <button type="button" onClick={onToggle}>
        회원가입 화면으로
      </button>
    </form>
  );
};

export default SignIn;
