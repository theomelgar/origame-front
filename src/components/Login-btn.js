"use-client";

import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { destroyCookie } from "nookies";
import Link from "next/link";


export default function SignInButton() {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();
  const { userData, setUauthToken, setUserInfo } = useContext(AuthContext);

  const handleLogOut = () => {
    setUauthToken(null);
    setUserInfo(null);
    destroyCookie(undefined, "uauth_token");
    destroyCookie(undefined, "userInfo");
    router.push("/");
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {userData ? (
        <Container ref={containerRef}>
          <img
            src={userData.picture}
            onClick={() => setShowOptions(!showOptions)}
          />
          {showOptions && (
            <OptionsContainer>
              <Link href="/profile"> Profile </Link>
              <Link onClick={handleLogOut}> Log out </Link>
            </OptionsContainer>
          )}
        </Container>
      ) : (
        <button onClick={() => router.push("/sign-in")}>Login</button>
      )}
    </>
  );
}


const Container = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: transform 1.3s ease-in-out;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 150px;
  height: 100px;
  background-color: var(--color-details);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  gap: 25px;
  font-size: large;
  z-index: 3;
  border: 1px solid #000000;
  a {
    color: var(--color-primary);

    &:hover {
      text-decoration: underline;
    }
  }
`;
