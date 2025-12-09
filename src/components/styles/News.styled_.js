import styled from "styled-components";

export const NewsList = styled.div`
  // padding: 10px;
  width: 100%;
  max-width: 1000px;
  div {
    // padding: 10px;
    display: flex;
    //flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
    div {
      padding: 10px;
      border: none;
      text-align: justify;
      // box-sizing: border-box;
    }
  }
`;

export const NewsArticleDate = styled.div`
  width: 120px;
  min-width: 120px;
  max-height: 60px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, $team }) => theme.colors[$team]};
  color: white;
`;

export const NewsArticleContent = styled.div`
  a {
    color: ${({ theme }) => theme.colors.link};
  }
`;
