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
  const [tutorialNumberId, setTutorialNumberId] = useState(1);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial`
        );
        setTutorials(response.data);
        generateTheSuggestion(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTutorials();
  }, []);

  const generateTheSuggestion = (res) => {
    if (res.length > 0) {
      const randomIndex = Math.floor(Math.random() * res.length);
      setTutorialNumberId(randomIndex);
    }
  };

  useEffect(() => {
    if (tutorialNumberId && tutorials.length > 0) {
      const selected = tutorials.find(
        (tutorial) => tutorial.id === tutorials[tutorialNumberId].id
      );
      setSelectedTutorial(selected);
    }
  }, [tutorialNumberId, tutorials, search]);

  return (
    <Container>
      <Navbar search={search} setSearch={setSearch} />
      <Box>
        <WelcomeSection />
        <Tutorials>
          {search.length > 0 ? (
            search.slice(0, 10).map((element) => (
                <TutorialPage
                  key={element.id}
                  id={element.id}
                  userId={element.userId}
                  title={element.title}
                  description={element.description}
                  category={element.category}
                  images={element.images}
                  resultUrl={element.resultUrl}
                  createdAt={element.createdAt}
                  />
              ))
          ) : tutorials && search.length === 0 ? (
            tutorials.slice(0, 10).map((element) => (
                <TutorialPage
                  key={element.id}
                  id={element.id}
                  userId={element.userId}
                  title={element.title}
                  description={element.description}
                  category={element.category}
                  images={element.images}
                  resultUrl={element.resultUrl}
                  createdAt={element.createdAt}
                />
              ))
          ) : tutorials.length===0(
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
  background: var(--color-available);
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
  gap: 5em;
`;
