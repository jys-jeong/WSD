import React from "react";
import "./toast.module.css";

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return <div className="toast">{message}</div>;
};

export default Toast;
