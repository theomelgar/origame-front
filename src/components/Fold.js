import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FoldEffectCard = () => {
  const [tutorials, setTutorials] = useState([]);
  const [tutorialNumberId, setTutorialNumberId] = useState(1);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

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
  }, [tutorialNumberId, tutorials]);
  return (
    <FoldedPart title="Sugestão de Origami">
      {selectedTutorial && (
        <Link href={`/tutorial/${selectedTutorial.id}`}>
          <Fold>
            <img src={selectedTutorial.resultUrl} alt="Tutorial"/>
          </Fold>
        </Link>
      )}
    </FoldedPart>
  );
};

export default FoldEffectCard;

const FoldedPart = styled.div`
  background: linear-gradient(#fff, #fdff86);
  width: 5em;
  height: 5em;
  position: absolute;
  top: 101px;
  right: 0;
  z-index: 2;
  transition: all ease 0.5s;

  :hover,
  :active {
    width: 7.4em;
    height: 7.4em;
    cursor: pointer;
  }
`;

const Fold = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 10px;
    right: 13%;
    box-shadow: 10px 10px 20px rgba(1, 1, 1, 0.5); /* Updated box-shadow values */
    transition: transform 0.6s ease-in-out;
  }
  ::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    box-shadow: 5px 5px 20px rgba(1, 1, 1, 10);
    border-width: 0 100px 100px 0;
    border-color: #ececec transparent;
    transition: all ease 0.5s;
  }
  :hover:before,
  :active:before {
    cursor: pointer;
    border-width: 0 150px 150px 0;
    border-color: #ececec transparent;
  }

  :hover img,
  :active img {
    transform: rotate(10deg);
    cursor: pointer;
  }
`;
