import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TutorialPage from "@/components/Tutorial";
import WelcomeSection from "@/components/Welcome";
import ScrollToTopButton from "@/services/ScrollTop";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function TutorialIdPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tutorial, setTutorial] = useState([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/tutorial/${id}`
        );
        setTutorial(response.data);
        console.log(response.data);
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
        {tutorial ? (
          <TutorialPage
            key={tutorial.id}
            title={tutorial.title}
            description={tutorial.description}
            category={tutorial.category}
            images={tutorial.images}
            resultUrl={tutorial.resultUrl}
            createdAt={tutorial.createdAt}
          />
        ) : (
          <>No content yet</>
        )}
      </Box>
      <Footer />
      <ScrollToTopButton />
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100%;
  background: #fcfcfc;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Box = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
