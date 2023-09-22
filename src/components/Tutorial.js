"use-client";

import { useContext, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import ReactModal from "react-modal";
import { useRouter } from "next/router";
import getTimeAgo from "@/services/timeAgo";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function TutorialPage({
  id,
  title,
  description,
  resultUrl,
  category,
  images,
  userId,
  createdAt,
}) {
  const { userData, token } = useContext(AuthContext);
  const loggedInUserId = userData?.id;
  let tutorialId = id;
  const router = useRouter();

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newResultUrl, setNewResultUrl] = useState(resultUrl);
  const [newCategory, setNewCategory] = useState(category);
  const [newImages, setNewImages] = useState(images);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;

    return imageExtensions.test(url);
  };

  const canEditOrDelete = loggedInUserId === userId;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const tutorialData = {
      title: newTitle,
      description: newDescription,
      resultUrl: newResultUrl,
      category: newCategory,
      images: newImages,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial/${id}`,
        tutorialData,
        {
          headers: {
            Authorization: `Bearer ${token?.uauth_token}`,
          },
        }
      );
      setIsEditing(false);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.uauth_token}`,
          },
          data: { userId: loggedInUserId },
        }
      );
      toast("Tutorial deleted successfully!", { type: "success" });
      setIsModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeAgo = getTimeAgo(date);
  return (
    <TutorialContainer>
      {isEditing ? (
        <Container>
          <h1>Create Tutorial</h1>
          <input
            type="text"
            placeholder="URL of the image result"
            required
            value={newResultUrl}
            onChange={(e) => setNewResultUrl(e.target.value)}
          />
          <h3>
            If you do not have your URL image, use imgur.com to post your image,
            and take the URL
            <Button
              className="btn btn--primary"
              onClick={() => window.open("https://imgur.com/", "_blank")}
            >
              here
            </Button>
          </h3>
          <input
            type="text"
            required
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            className="opacity-40 text-black font-bold"
            disabled
            placeholder="Category"
            value={newCategory}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, ""); // Remove spaces from the input value
              setNewCategory(value);
            }}
          />
          <textarea
            className="opacity-40 text-black font-bold"
            placeholder="URLs of the images steps, it can be a youtube video! (one per line)"
            value={newImages.map((i) => i.url).join("\n")}
            disabled
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                const urlList = value.split("\n").map((url) => url.trim());
                setNewImages(urlList);
              } else {
                setNewImages([]);
              }
            }}
          ></textarea>
          <div className="btn-group">
            <Button
              className="btn btn--primary hover:opacity-80"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="btn btn--primary hover:opacity-80"
              onClick={handleIsEditing}
            >
              Cancel
            </Button>
          </div>
        </Container>
      ) : (
        <>
          <Info>
            <Title>{title}</Title>
            <Created>
              <br />
              {timeAgo}
              <br />
              This was publicated in {formattedDate}
            </Created>
            <Classification>Category : {category}</Classification>
          </Info>
          <Image src={resultUrl} alt="Tutorial Image" />
          <Description>Description : {description}</Description>
          <Photos>Step by step : {renderImages()}</Photos>
          {canEditOrDelete && (
            <EditDeleteButtons className="btn-group">
              <Button className="btn btn--primary" onClick={handleIsEditing}>
                Edit
              </Button>
              <Button className="btn btn--primary" onClick={openModal}>
                Delete
              </Button>
            </EditDeleteButtons>
          )}
          <CommentsContainer>
            <Comment>Comment 1</Comment>
            <Comment>Comment 2</Comment>
            <Comment>Comment 3</Comment>
          </CommentsContainer>
          <ReactModal
            style={customStyles}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
          >
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this tutorial?</p>
            <Button
              className="btn btn--primary"
              onClick={() => handleDelete(tutorialId)}
            >
              Delete
            </Button>
            <Button className="btn btn--text" onClick={closeModal}>
              Cancel
            </Button>
          </ReactModal>
        </>
      )}
    </TutorialContainer>
  );
}
const TutorialContainer = styled.div`
  background: var(--color-primary);
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 16px;
  gap: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); 

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
    margin-top: 60px;
  }

  position: relative;
  overflow: hidden;
  ::before {
    content: "";
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 100%;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    filter: blur(100px);
  }
`;
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-top: 2%;
  padding-left: 2%;
`
const Title = styled.h1`
  font-weight: 700;
  width: 100%;
  font-size: 24px;
`;

const Created = styled.h2`
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  text-align: right;
`;

const Classification = styled.p`
  width: 100%;
  font-weight: bold;
`;


const Image = styled.img`
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); 

`;

const Photos = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); 
  padding:  10px;
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); 

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Player = styled.div`
  width: 100%;
  position: relative;
`;

const Description = styled.p`
  text-align: start;
  width: 100%;
  margin-bottom: 16px;
`;

const EditDeleteButtons = styled.div``;

const Button = styled.button`
  :hover {
    opacity: 0.7;
  }
`;

const CommentsContainer = styled.div`
  width: 100%;
  border: 1px solid var(--color-secondary);
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); 

  align-items: flex-start;
`;

const Comment = styled.div`
  text-align: start;
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); 

  margin-bottom: 8px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 600px;
  gap: 10px;
  h3 {
    font-size: 20px;
    button {
      background: var(--color-available);
      padding: 7px;
    }
  }
  textarea {
    width: 100%;
  }

  @media (max-width: 768px) {
    /* Styles for screens up to 768px wide */
    min-height: 400px;
    h3 {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    /* Styles for screens up to 480px wide */
    min-height: 300px;
    h3 {
      font-size: 16px;
    }
  }
`;
