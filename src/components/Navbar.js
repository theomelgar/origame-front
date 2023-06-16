import styled from "styled-components";
import Image from "next/image";
import origameLogo from "../assets/origameLogo.svg";
import FoldEffectCard from "./Fold";

export default function Navbar() {
  return (
    <Container>
      <Logo href="/">
        <Image src={origameLogo} alt="Origame Logo" />{" "}
      </Logo>
      <NavLinks>
        <NavLink href="/">Home</NavLink>|<NavLink href="about  ">About</NavLink>
        |<NavLink href="sign-in">Login</NavLink>
      </NavLinks>
      <FoldEffectCard />
    </Container>
  );
}

const Container = styled.nav` 
  background-color: #ffe6ff;
  position: relative;
  color: #000;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #aaaaaa;
  img {
    border: 1px solid #000;
    max-width: 67px;
  }
`;

const Logo = styled.a`
  font-size: 24px;
  text-decoration: none;
`;

const NavLinks = styled.div`
  font-size: clamp(12px, 2vw, 24px);
  display: flex;
  gap: 16px;
`;

const NavLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
