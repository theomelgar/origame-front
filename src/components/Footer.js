import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Origame. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  max-height: 100px;
  background-color: #363434;
  color: #ffffff;
  padding: 16px;
  text-align: center;
  width: 100%;
`;

export default Footer;
