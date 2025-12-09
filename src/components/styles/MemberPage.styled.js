import styled from "styled-components";
// import ReactWordcloud from "react-wordcloud";
import { WordCloud } from "@isoterik/react-word-cloud";

export const StyledMemberPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  img {
    width: 200px;
  }
  a {
    padding: 10px;
  }
`;
export const Ids = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const StyledWordCloud = styled(WordCloud)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
`;
