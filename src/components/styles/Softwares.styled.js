import styled from "styled-components";

export const SoftwareList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-decoration: none;
`;

export const Software = styled.div`
  border-radius: 1rem;
  border: 1px solid lightgrey;
  padding: 1rem;
  margin: auto;
  width: 80%;
  text-decoration: inherit;
`;

export const SoftwareHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: inherit;
  div {
    font-size: 1.25rem;
    text-decoration: inherit;
    a {
      text-decoration: inherit;
      color: ${({ theme }) => theme.colors.publication_link};
    }
  }
`;
export const SoftwareInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: inherit;
  height: 50px;
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
