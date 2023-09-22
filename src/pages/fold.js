import styled from "styled-components";

export default function page() {
  return <Container><Box></Box></Container>;
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 100px;
  background: #efefef;
`

const Box = styled.div`
	position: relative;
  background: #fff;
  width: 50%;
  margin: 10px;
  box-shadow: 0px 2px 38px rgba(0, 0, 0, 0.2);
  height: 400px;

:after, :before{
  content: '';
  position: absolute;
  left: auto;
  background:none;
  z-index: -1;
}
:after{
  width: 90%;
  height: 10px;
  top: 30px;
  right:8px;
  -webkit-transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  -o-transform: rotate(-3deg);
  -ms-transform: rotate(-3deg);
  transform: rotate(-3deg);
  -webkit-box-shadow: 0px -20px 36px 5px #295d92;
  -moz-box-shadow: 0px -20px 36px 5px #295d92;
  box-shadow: 0px -25px 35px 0px rgba(0,0,0,0.5);
}

:before{
  width: 10px;
  height: 95%;
  top: 5px;
  right:18px;
  -webkit-transform: rotate(3deg);
  -moz-transform: rotate(3deg);
  -o-transform: rotate(3deg);
  -ms-transform: rotate(3deg);
  transform: rotate(3deg);
  -webkit-box-shadow: 20px 0px 25px 5px #295d92;
  -moz-box-shadow: 20px 0px 25px 5px #295d92;
  box-shadow: 22px 0px 35px 0px rgba(0,0,0,0.5);
}
`