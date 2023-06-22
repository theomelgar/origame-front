import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

const TutorialPage = ({ title, description, resultUrl, category, images }) => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const renderImages = () => {
    if (images && images.length > 0) {
      return images.map((image) =>
        isImageURL(image.url) ? (
          <img src={image.url} key={image.id} alt="Tutorial Image" />
        ) : (
          <VideoContainer key={image.id}>
            <Player>
              <ReactPlayer
                className="react-player"
                controls={true}
                url={image.url}
                width="100%"
              />
            </Player>
          </VideoContainer>
        )
      );
    } else {
      return <p>No images available.</p>;
    }
  };

  const isImageURL = (url) => {
    // Regular expression pattern to match image file extensions
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;

    // Test if the URL matches the image file extension pattern
    return imageExtensions.test(url);
  };

  return (
    <TutorialContainer>
      <Title>{title}</Title>
      <Image src={resultUrl} alt="Tutorial Image" />
      {/* <VideoContainer>
        <Player>
          <ReactPlayer
            className="react-player"
            controls='true'
            url="https://www.youtube.com/watch?v=q0tLjyoC_7c"
            width="100%"
            height="100%"
          />
        </Player>
      </VideoContainer> */}
      <Photos>Steps:{renderImages()}</Photos>
      <Classification>Category : {category}</Classification>
      <Description>Description : {description}</Description>
      <CommentsContainer>
        <Comment>Comment 1</Comment>
        <Comment>Comment 2</Comment>
        <Comment>Comment 3</Comment>
      </CommentsContainer>
    </TutorialContainer>
  );
};
const TutorialContainer = styled.div`
  border: 1px solid #000000;
  background: #a3a3a3;
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  width: 100%;
  text-align: start;
  font-size: 24px;
  margin-bottom: 16px;
`;

const Image = styled.img`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Photos = styled.div`
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const VideoContainer = styled.div`
  width: 500px;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Player = styled.div`
  width: 100%;
  position: relative;
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
