import styled from "styled-components";

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  minheight: 100vh;
  // overflow: hidden;
  height: 100%;
  justify-content: space-between;
  // width: 100%;
`;

export const MainContainer = styled.div`
  width: 100%;
  // flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  // svg {
  //     margin: 0 auto 0 auto;
  //     width: 50%;
  //     height: 50%;
  // }
`;

export const HorizontalContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const HorizontalCenteredContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  place-items: center;
  justify-content: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  margin: 50px;
  width: 80%;
`;
