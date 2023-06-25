import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import styled from "styled-components";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollButton
      className={`scroll-to-top-button ${showButton ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </ScrollButton>
  );
};

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #7e7e7e;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.show {
    opacity: 1;
  }

  svg {
    margin-top: -2px;
  }
`;

export default ScrollToTopButton;
