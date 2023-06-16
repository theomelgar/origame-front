import styled from "styled-components";
import Image from "next/image";
import origameLogo from "../assets/origameLogo.svg";

const WelcomeSection = () => {
  return (
    <WelcomeContainer>
      <BackgroundImage />
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
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0px;
  color: #000;
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