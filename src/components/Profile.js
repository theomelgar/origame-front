import styled from "styled-components";
import AuthComponent from "./AuthComponents";

export default function ProfilePage() {
  
  const { }

  return (
    <AuthComponent>
      <Container>
        <h1>{session.user.name}</h1>
        <img src={session.user.image} alt="Profile Picture" />
      </Container>
    </AuthComponent>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
