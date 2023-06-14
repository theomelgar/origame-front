import React from "react";
import styled from "styled-components";

const FoldedCard = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  color: #fff;
`;

const Fold = styled.div`
  width: 4.13em;
  height: 4.15em;
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  background: linear-gradient(-135deg, transparent 2.8em, #7bc2d2 0) no-repeat;
  background-repeat: no-repeat;
  box-shadow: 5px 5px 10px rgba(1, 1, 1, 10);
  :hover {
    transform: scale(1.04);
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }
`;

const FoldedPart = styled.div`
  width: 4.13em;
  height: 4.15em;
  width: 4.13em;
  height: 4.15em;
  position: absolute;
  top: 0;
  right: 0;
  img{
    max-width: 100%;
  }
`

const CardContent = styled.div`
  padding: 20px;
`;

const FoldEffectCard = () => {
  return (
    <FoldedCard>
      <FoldedPart>
      <Fold/>
      <img src="https://rabiscodahistoria.com/wp-content/uploads/2023/04/Dicas-A-Arte-do-Origami.webp"/>
      </FoldedPart>
      <CardContent>
        <h2>Front Panel</h2>
        <p>This is the front of the card.</p>
      </CardContent>
    </FoldedCard>
  );
};

export default FoldEffectCard;
