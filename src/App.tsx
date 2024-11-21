// /src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext"; // AuthProvider 임포트
import AppRoutes from "./routes"; // 라우팅 설정

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* AuthProvider로 감싸서 하위 컴포넌트들이 인증 상태에 접근 가능 */}
      <Router>
        <AppRoutes /> {/* 라우팅 설정 */}
      </Router>
    </AuthProvider>
  );
};

export default App;
