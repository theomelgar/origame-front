import styled from "styled-components";
export default function Info() {
  return (
    <Container>
      <About>
        <h1>Origame</h1>
        <h2>
            This website was created to be a community for everyone who enjoys
            or doesn't enjoy making origami. Feel very welcome, and if you have
            any suggestions for improvements on the site, please send me an
            email: theomelgar@gmail.com.
          </h2>
        <h2>
          Este site foi feito para ser uma comunidade para todos que gostam ou
          não de fazer origami. Sinta-se muito bem vindo, e se tiver qualquer
          sugestão de melhorias no site, me mande um email: theomelgar@gmail.com
        </h2>
        <Triangle/>
      </About>
    </Container>
  );
}

export const About = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 500px;
  height: auto;
  background: aliceblue;
  gap: 40px;
  padding: 20px;
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    &:nth-child(3) {
      opacity: 50%;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 100%;
  height: 100vh;
  background-color: wheat;
`;

  export const Triangle = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0 solid transparent;
    border-left: 50px solid aliceblue;
    border-bottom: 50px solid aliceblue;
    border-right: 50px solid wheat;
    top: 0;
    right: 0;
    transform: rotate(0deg);
  `
