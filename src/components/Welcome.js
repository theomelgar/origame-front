import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

import Image from "next/image";
import origameLogo from "../assets/origameLogo.png";

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
  width: 800px;
  position: relative;
  height: 500px;
  text-align: center;

  @media (max-width: 800px) { 
    width: 100%;
    padding: 25px;
  }
`;

const BackgroundImage = styled.div`
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Origami_-_Crane.svg/1752px-Origami_-_Crane.svg.png");
  background-size: contain ;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${pulseAnimation} 5s infinite;
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
  color: var(--color-primary);
  text-decoration: dashed;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

export default WelcomeSection;
