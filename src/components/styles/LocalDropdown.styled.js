import styled from "styled-components";

export const DropdownButton = styled.button`
  padding: 8px 24px;
  background-color: ${({ theme }) => theme.colors.header};
  color: black;
  border: none;
  &: hover {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
  @media (max-width: 600px) {
    display: block;
  }
`;

export const DropdownList = styled.ul`
  padding: 8px 24px;
  background-color: ${({ theme }) => theme.colors.header};
  color: black;
  border: none;
  @media (max-width: 600px) {
    display: block;
  }
  li {
    list-style: none;
    &: hover {
      background-color: ${({ theme }) => theme.colors.highlight};
    }
    button {
      border: none;
      background: none;
    }
  }
`;
