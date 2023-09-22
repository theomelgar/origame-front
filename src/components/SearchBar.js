import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

export default function SearchBar({ search, setSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorial/search/filter?title=${searchTerm}`
      );
      const data = await response.data;
      setSearch(data)
      setSearchTerm("")
      console.log(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <SearchBarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
      </SearchForm>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  width: 100%;
  height: 50px;
  max-width: 800px;
  font-size: x-large;
  font-weight: 700;
`;

const SearchForm = styled.form`
  width: 100%;
  height: 50px;
  position: relative;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  height: 100%;
  background-color: #ffffff;
  border: none;
  padding: 25px;
  outline: none;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px;
  position: absolute;
  bottom: 20%;
  right: 1em;
`;
