import SignInPage from "@/components/Signin";
import styled from "styled-components";

export default function Login() {
  return (
    <Container>
      <SignInPage />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`