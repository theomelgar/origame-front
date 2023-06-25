"use-client";

import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateTutorialPage() {
  const [resultUrl, setResultUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const { userData, token } = useContext(AuthContext);
  const userId = userData.id;
  const router = useRouter();
  
  const handleCreateTutorial = async (e) => {
    e.preventDefault();

    let imageList = [];

    if (images) {
      if (Array.isArray(images)) {
        imageList = images.filter((url) => url.trim() !== "");
      } else if (typeof images === "string") {
        imageList = [images.trim()];
      }
    }

    const tutorialData = {
      userId,
      resultUrl,
      title,
      description,
      category,
      images: imageList,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial`,
        tutorialData,
        {
          headers: {
            Authorization: `Bearer ${token?.uauth_token}`,
          },
        }
      );
      console.log(response);
      const tutorialId = response.data.id; 
      router.push(`/tutorial/${tutorialId}`);
    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    <Container t>
      <h1>Create Tutorial</h1>
      <input
        type="text"
        placeholder="URL of the image result"
        required
        value={resultUrl}
        onChange={(e) => setResultUrl(e.target.value)}
      />
      <h3>
        If you don't have your URL image, use imgur.com to post your image, and
        take the URL{" "}
        <button className="btn--primary" onClick={() => window.open("https://imgur.com/", "_blank")}>
          here
        </button>
      </h3>
      <input
        type="text"
        required
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="text"
        required
        placeholder="Category"
        value={category}
        onChange={(e) => {
          const value = e.target.value.replace(/\s/g, ""); // Remove spaces from the input value
          setCategory(value);
        }}
      />
      <textarea
        placeholder="URLs of the images steps, it can be a youtube video! (one per line)"
        value={Array.isArray(images) ? images.join("\n") : images}
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            const urlList = value.split("\n").map((url) => url.trim());
            setImages(urlList);
          } else {
            setImages([]);
          }
        }}
      ></textarea>
      <button className="btn btn--primary hover:opacity-80" onClick={handleCreateTutorial}>Create</button>
    </Container>
  );
}
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
      background: var(--color-avaiable);
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

