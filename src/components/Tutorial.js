"use-client";

import { useContext, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactModal from 'react-modal';
import { useRouter } from "next/router";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function TutorialPage({
  key,
  title,
  description,
  resultUrl,
  category,
  images,
  userId,
}) {
  
  const { userData, token } = useContext(AuthContext);
  const loggedInUserId = userData?.id;

  const router = useRouter();
  const { id } = router.query;
  const tutorialId = id
  console.log(tutorialId)
  
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const canEditOrDelete = loggedInUserId === userId;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (id) => {
    id.preventDefault();
    const tutorialData = {
      userId,
      resultUrl,
      title,
      description,
      category,
      images,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial/${id}`,
        tutorialData,
        {
          headers: {
            Authorization: `Bearer ${token?.uauth_token}`,
          },
        }
      );
      console.log(response.data); // handle success
    } catch (error) {
      console.error(error); // handle error
    }
  };

  const handleDelete = async (id) => {
    console.log(loggedInUserId)
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.uauth_token}`,
          },
          data: { userId: loggedInUserId }, // Pass userId in the request body
        }
      );
      toast("Tutorial deleted successfully!", { type: "success" });
      console.log(response.data); // handle success
      setIsModalOpen(false)
      router.push('/')
    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    <TutorialContainer>
      <Title>{title}</Title>
      <Image src={resultUrl} alt="Tutorial Image" />
      <Photos>Steps: {renderImages()}</Photos>
      <Classification>Category: {category}</Classification>
      <Description>Description: {description}</Description>
      {canEditOrDelete && (
        <EditDeleteButtons className="btn-group">
          <Button className="btn btn--primary" onClick={() => handleEdit(tutorialId)}>
            Edit
          </Button>
          <Button
            className="btn btn--primary"
            onClick={openModal}
          >
            Delete
          </Button>
        </EditDeleteButtons>
      )}
      <CommentsContainer>
        <Comment>Comment 1</Comment>
        <Comment>Comment 2</Comment>
        <Comment>Comment 3</Comment>
      </CommentsContainer>
      <ReactModal style={customStyles} isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this tutorial?</p>
        <Button className="btn btn--primary" onClick={()=>handleDelete(tutorialId)}>Delete</Button>
        <Button className="btn btn--text" onClick={closeModal}>Cancel</Button>
      </ReactModal>
    </TutorialContainer>
  );
}

const TutorialContainer = styled.div`
  border: 1px solid #000000;
  background: #a3a3a3;
  max-width: 1000px;
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
  gap: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
    margin-top: 60px;
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
  gap: 20px;
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
  text-align: center;
`;

const EditDeleteButtons = styled.div``;

const Button = styled.button`
  :hover {
    opacity: 0.7;
  }
`;

const CommentsContainer = styled.div`
  margin-bottom: 16px;
`;

const Comment = styled.div`
  margin-bottom: 8px;
`;
