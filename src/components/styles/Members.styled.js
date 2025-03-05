import styled from "styled-components";

export const Members = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`;

export const StyledMember = styled.div`
  img {
    // width: 100%;
    border-radius: 50% !important;
    height: 100px;
    width: 100px;
  }
`;
