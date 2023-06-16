import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TutorialPage from "@/components/Tutorial";
import WelcomeSection from "@/components/Welcome";
import { Inter } from "next/font/google";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Container>
      <Navbar/>
      <Box>
        <WelcomeSection/>
        <Tutorials>
          <TutorialPage/>
          <TutorialPage/>
          <TutorialPage/>
        </Tutorials>
      </Box>     
      <Footer/> 
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#fff, #a8a8a8);
  overflow: scroll;

`
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Welcome = styled.div`
border: 1px solid black;
`
const Tutorials = styled.div`
border: 1px solid black;
`