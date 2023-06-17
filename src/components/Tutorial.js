import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

const TutorialPage = () => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  return (
    <TutorialContainer>
      <Title>Tutorial Title</Title>
      <Image
        src="https://i.ytimg.com/vi/rP854rFvWrQ/maxresdefault.jpg"
        alt="Tutorial Image"
      />
      <VideoContainer>
        <Player>
          <ReactPlayer
            className="react-player"
            controls='true'
            url="https://www.youtube.com/watch?v=q0tLjyoC_7c"
            width="100%"
            height="100%"
          />
        </Player>
      </VideoContainer>
      <Classification>Classification: Beginner</Classification>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac est in
        risus vulputate lobortis. Aliquam maximus, mauris ut volutpat
        ullamcorper, ante lorem aliquet dui, eu tristique eros erat vitae urna.
      </Description>
      <CommentsContainer>
        <Comment>Comment 1</Comment>
        <Comment>Comment 2</Comment>
        <Comment>Comment 3</Comment>
      </CommentsContainer>
    </TutorialContainer>
  );
};

const TutorialContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Image = styled.img`
  max-width: clamp(0px, 800px, 100%);
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 320px) {
    padding: 8px;
  }
`;

const VideoContainer = styled.div`
  margin-bottom: 16px;
`;


const Player = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  .react-player {
  position: absolute;
  top: 0;
  left: 0;
}
`
const Classification = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.p`
  margin-bottom: 16px;
`;

const CommentsContainer = styled.div`
  margin-bottom: 16px;
`;

const Comment = styled.div`
  margin-bottom: 8px;
`;

export default TutorialPage;
