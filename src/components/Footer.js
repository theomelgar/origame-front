import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Origame. All rights reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #f2f2f2;
  padding: 16px;
  text-align: center;
  width: 100vw;
`;

export default Footer;
