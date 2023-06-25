import SignInPage from "@/components/Signin";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Login() {
  const router = useRouter();

  
    return (
      <Container>
        <SignInPage />
      </Container>
    );
  

}

const Container = styled.div`
  width: 100%;
`;
