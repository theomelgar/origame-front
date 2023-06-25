'use-client'

import styled from "styled-components";
import AuthComponent from "./AuthComponents";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import CreateTutorialPage from "./CreateTutorial";

export default function ProfilePage() {
  
  const { userData } = useContext(AuthContext);
  const photo = userData.picture
  const email = userData.email
  const router = useRouter()
  useEffect(() => {
    if (!userData) {
      router.push('/sign-in');
    }
  }, [userData, router]);
  return (
      <Container>
        <UserInfo>
        <h1>{email}</h1>
        <img src={photo} alt="Profile Picture" />
        </UserInfo>
        <CreateTutorialPage/>
      </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 40px;
  gap: 40px;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div`
  width: 90%;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-avaiable);
  img{
    width: 100px;
  }
`