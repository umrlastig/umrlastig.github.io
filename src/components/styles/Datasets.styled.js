import styled from "styled-components";

export const DatasetLegend = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1rem;
  margin: 2rem;
  text-decoration: none;
  justify-content: space-between;
`;
export const DatasetLegendItem = styled.div`
  width: 200px;
  background-color: ${({ theme, $dataTheme }) => theme.colors[$dataTheme]};
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  color: white;
  font-size: small;
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
  border: 1px solid lightgrey;
  padding: 1rem;
  margin: auto;
  width: 80%;
  text-decoration: inherit;
  margin-bottom: 5px;
  //   background-color: #f6f6f6;
`;

export const DatasetHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: inherit;
  font-size: 1.25rem;
`;

export const DatasetTheme = styled.div`
  font-size: 0.9rem;
  background-color: ${({ theme, $dataTheme }) => theme.colors[$dataTheme]};
  border-radius: 1rem;
  padding: 1rem;
  translate: 0 -40px;
  color: white;
`;
export const DatasetInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: inherit;
  height: 100px;
  div {
    text-decoration: inherit;
    a {
      text-decoration: inherit;
    }
  }
  img {
    object-position: left top;
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

export const DatasetImageHolder = styled.div`
  min-width: 200px;
  max-width: 200px;
  height: 100px;
  object-position: left top;
  display: flex;
  flex-direction: column;
`;

export const DatasetTitleHolder = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme, $dataTheme }) => theme.colors[$dataTheme]};
`;
