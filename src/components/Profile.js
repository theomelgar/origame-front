"use-client";

import styled from "styled-components";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import CreateTutorialPage from "./CreateTutorial";

export default function ProfilePage() {
  const { userData } = useContext(AuthContext);
  const photo = userData.picture;
  const email = userData.email;
  const router = useRouter();
  useEffect(() => {
    if (!userData) {
      router.push("/sign-in");
    }
  }, [userData, router]);
  return (
    <Container>
      <UserInfo>
        <img src={photo} alt="Profile Picture" />

        {userData.username ? (
          <h1>Username: {userData.username}</h1>
        ) : (
          <h1>Username: {email}</h1>
        )}
      </UserInfo>
      <CreateTutorialPage />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  padding: 40px;
  gap: 40px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    /* Styles for screens up to 768px wide */
    padding: 20px;
    gap: 20px;
  }

  @media (max-width: 480px) {
    /* Styles for screens up to 480px wide */
    margin-top: 100px;
    padding: 10px;
    gap: 10px;
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: flex-start;
  align-items: center;
  img {
    max-width: 100px;
    max-height: 100px;
    border: 1px solid #000;
  }

  @media (max-width: 768px) {
    /* Styles for screens up to 768px wide */
    flex-direction: column;
    height: auto;
    padding: 20px;
    gap: 20px;
    text-align: center;
  }
`;
