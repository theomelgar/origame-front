import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const PulseElement = () => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 1000); // Change the duration here to control the speed of the pulse

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <PulsatingDiv className={isPulsing ? "pulsating" : ""} />;
};

const PulsatingDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: #333;
  opacity: 0.5;
  animation: ${pulseAnimation} 2s infinite;
`;

export default PulseElement;
