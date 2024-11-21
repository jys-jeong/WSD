import React, { createContext, useContext, useState } from "react";
import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
} from "../../utils/localstorage";
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getFromStorage("isAuthenticated") === "true"
  );

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    const users = JSON.parse(getFromStorage("users") || "[]");

    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      saveToStorage("isAuthenticated", "true");
      return true;
    }

    return false;
  };

  // 회원가입 함수
  const signUp = async (email: string, password: string) => {
    const newUser = { email, password };

    // 기존 사용자 정보를 로컬스토리지에서 불러오기
    const users = JSON.parse(getFromStorage("users") || "[]");
    const user = users.find((user: { email: string }) => user.email === email);
    console.log(user);
    if (user) {
      alert("회원이메일이 존재합니다.");
      return false;
    } else {
      // 새로운 사용자 추가
      users.push(newUser);

      // 로컬스토리지에 업데이트된 사용자 정보 저장
      saveToStorage("users", JSON.stringify(users));
      saveToStorage("isAuthenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
  };

  // 로그아웃 함수
  const signOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
