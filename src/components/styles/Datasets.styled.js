import styled from "styled-components";

export const DatasetLegend = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin: 2rem;
  text-decoration: none;
  justify-content: space-between;
`;
export const DatasetLegendItem = styled.div`
  width: 200px;
  background-color: ${({ theme, $dataTheme }) => theme.colors[$dataTheme]};
  border-radius: 1rem;
  padding: 1rem;
`;

export const DatasetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-decoration: none;
`;

export const Dataset = styled.div`
  border-radius: 1rem;
  border: 2px solid black;
  padding: 1rem;
  margin: auto;
  width: 80%;
  text-decoration: inherit;
`;

export const DatasetHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: inherit;
  div {
    font-size: 1.25rem;
    text-decoration: inherit;
    a {
      text-decoration: inherit;
    }
  }
  div:last-child {
    font-size: 1rem;
    background-color: ${({ theme, $dataTheme }) => theme.colors[$dataTheme]};
    border-radius: 1rem;
    padding: 1rem;
    translate: 0 -40px;
  }
`;
export const DatasetInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: inherit;
  div {
    text-decoration: inherit;
    a {
      text-decoration: inherit;
    }
  }
`;

export const Downloads = styled.div`
  font-size: 1rem;
  background-color: black;
  color: white;
  border-radius: 1rem;
  padding: 1rem;
  font-family: avenir, sans-serif;
  height: 23px;
`;
