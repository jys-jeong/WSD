import React from "react";

interface AuthFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>{title}</h2>
      {children}
      <button type="submit" className="submit-button">
        {title}
      </button>
    </form>
  );
};

export default AuthForm;
