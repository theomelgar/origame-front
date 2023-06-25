"use-client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TutorialPage from "@/components/Tutorial";
import WelcomeSection from "@/components/Welcome";
import ScrollToTop from "@/services/ScrollTop";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tutorials, setTutorials] = useState([]);
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial`
        );
        setTutorials(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <Container>
      <Navbar />
      <Box>
        <WelcomeSection />
        <Tutorials>
          {tutorials ? (
            tutorials.map((elemento) => (
              <TutorialPage
                key={elemento.id}
                id={elemento.id}
                userId={elemento.userId}
                title={elemento.title}
                description={elemento.description}
                category={elemento.category}
                images={elemento.images}
                resultUrl={elemento.resultUrl}
                createdAt={elemento.createdAt}
              />
            ))
          ) : (
            <>No content yet</>
          )}
        </Tutorials>
      </Box>
      <Footer />
      <ScrollToTop />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100%;
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

const Tutorials = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 40px;
`;
