import styled from "styled-components";

export const NewsList = styled.div`
  // padding: 10px;
  width: 100%;
  div {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem 0 0 0.25rem;
    // padding: 10px;
    display: flex;
    flex-direction: row;

    div {
      padding: 10px;
      border: none;
      // box-sizing: border-box;
    }
  }
`;

export const NewsArticleDate = styled.div`
  width: 120px;
  min-width: 120px;
  background-color: ${({ theme, team }) => theme.colors[team]};
  color: white;
`;
