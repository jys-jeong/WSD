import React from "react";

const TopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <button onClick={scrollToTop}>Top</button>;
};

const styles = {
  topButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default TopButton;
