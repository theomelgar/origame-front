import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

import Image from "next/image";
import origameLogo from "../assets/origameLogo.svg";

const pulseAnimation = keyframes`
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.1;
  }
`;

const WelcomeSection = () => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 1000); // Change the duration here to control the speed of the pulse

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <WelcomeContainer>
      <BackgroundImage className={isPulsing ? "pulsating" : ""} />
      <Content>
        <Title>Welcome to OrigaMe</Title>
        <Subtitle>Fold the universe</Subtitle>
      </Content>
    </WelcomeContainer>
  );
};

const WelcomeContainer = styled.div`
  position: relative;
  height: 500px;
`;

const BackgroundImage = styled.div`
  background-image: url("https://prints.ultracoloringpages.com/b3c74be583c18afa47fe564215ff07b6.png");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  transition: opacity 0.9s ease;
  animation: ${pulseAnimation} 12s infinite;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 30px;
  color: #000000;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export default WelcomeSection;
