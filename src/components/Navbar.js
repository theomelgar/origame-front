import styled from "styled-components";
import Image from "next/image";
import origameLogo from "../assets/origameLogo.svg";
import FoldEffectCard from "./Fold";
import SignInButton from "./Login-btn";
import SearchBar from "./SearchBar";
import CategoryBar from "./Categories";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar({ search, setSearch }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial/categories/filter`
        );
        const data = await response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Container>
      <Logo href="/">
        <Image
          style={{ background: "#ffffff" }}
          src={origameLogo}
          alt="Origame Logo"
        />{" "}
      </Logo>
      <FilterOptions>
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryBar categories={categories} />
      </FilterOptions>
      <NavLinks>
        <NavLink href="/">Home</NavLink>|<NavLink href="/about">About</NavLink>|
        <NavLink>
          <SignInButton />
        </NavLink>
      </NavLinks>
      <MenuBar>
        <FaBars className="text-gray-50 text-4xl" />
      </MenuBar>
      <FoldEffectCard />
    </Container>
  );
}

const Container = styled.nav`
  max-height: 100px;
  width: 100vw;
  background-color: #363434;
  position: relative;
  top: 0;
  left: 0;
  color: #000000;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #aaaaaa;
  button {
  }
  img {
    border: 1px solid #000000;
    max-width: 67px;
  }
`;

const Logo = styled.a`
  font-size: 24px;
  text-decoration: none;
`;

const FilterOptions = styled.a`
  margin-left: 13%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  overflow: hidden;
  width: 800px;
  height: 50px;
  @media (max-width: 800px) {
    visibility: hidden;
    width: 0;
  }
`;

const NavLinks = styled.div`
  font-size: clamp(12px, 2vw, 24px);
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fcfcfc;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    color: var(--color-selected);
    transform: scale(1.2);
  }
`;

const MenuBar = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: flex;
  }
`;
