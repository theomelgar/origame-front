"use-client";

import AuthComponent from "@/components/AuthComponents";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfilePage from "@/components/Profile";
import { AuthContext } from "@/contexts/AuthContext";
import ScrollToTopButton from "@/services/ScrollTop";
import { useContext } from "react";
import styled from "styled-components";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  
  if (userData) {
    return (
      <Container>
        <Navbar />
        <Box>
          <ProfilePage />
        </Box>
        <Footer />
        <ScrollToTopButton />
      </Container>
    );
  } else {
    return (
      <>
      <Navbar/>
      <Footer/>
      </>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #fcfcfc;
  position: relative;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;
