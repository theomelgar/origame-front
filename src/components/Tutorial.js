import React from "react";
import styled from "styled-components";

const TutorialPage = () => {
  return (
    <TutorialContainer>
      <Title>Tutorial Title</Title>
      <Image src="tutorial-image.jpg" alt="Tutorial Image" />
      <VideoContainer>
        <Video src="tutorial-video.mp4" controls />
      </VideoContainer>
      <Classification>Classification: Beginner</Classification>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac est
        in risus vulputate lobortis. Aliquam maximus, mauris ut volutpat
        ullamcorper, ante lorem aliquet dui, eu tristique eros erat vitae
        urna.
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
  max-width: 100%;
  margin-bottom: 16px;
`;

const VideoContainer = styled.div`
  margin-bottom: 16px;
`;

const Video = styled.video`
  max-width: 100%;
`;

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
