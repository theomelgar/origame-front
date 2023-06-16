import React from "react";
import styled from "styled-components";

const FoldEffectCard = () => {
  return (
      <FoldedPart>
        <Fold>
        <img src="https://rabiscodahistoria.com/wp-content/uploads/2023/04/Dicas-A-Arte-do-Origami.webp" />
        </Fold>
      </FoldedPart>
  );
};

export default FoldEffectCard;

const FoldedPart = styled.div`
  width: 4.13em;
  height: 4.15em;
  width: 4.13em;
  height: 4.15em;
  position: absolute;
  top:101px;
  right: 0;
  z-index: 2;
`;

const Fold = styled.div`
  img {
    margin: 15px -10px;
    box-shadow: 5px 5px 5px rgba(1, 1, 1, 0.3);
    transition: transform 0.6s ease-in-out;
  }
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 5px 5px 20px rgba(1, 1, 1, 10);
    border-width: 0 100px 100px 0;
    border-color:#ececec transparent;
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
    transform: rotate(15deg);
    cursor: pointer;
  }
`;
