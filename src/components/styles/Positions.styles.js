import styled from "styled-components";

export const Position = styled.li`
  list-style: none;
  margin: 1rem;
  border-radius: 1rem;
  border: 1px solid lightgrey;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    &:after {
      content: ". ";
    }
  }
  span {
    margin-left: 10px;
    margin-right: 10px;
  }
  span:last-child {
    font-size: 1rem;
    background: conic-gradient(
      ${({ theme, $team }) =>
        $team
          .map(
            (team, index) =>
              `${theme.colors[team]} ${
                (index * 360.0) / $team.length
              }deg ${((index + 1) * 360.0) / $team.length}deg`,
          )
          .join(", ")}
    );
    color: white;
    border-radius: 1rem;
    padding: 1rem;
    translate: 0 -40px;
    margin-top: 10px;
    margin-left: auto;
  }
`;

export const PositionList = styled.ul`
  width: 80%;
`;

export const ImageLink = styled.div`
  width: 32px;
  height: 32px;
  display: block;
  float: right;
  svg {
    width: 100%;
    height: 100%;
  }
  button {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
  }
  iconify-icon {
    svg {
      width: 2em;
      height: 2em;
    }
  }
  a {
    color: ${({ theme }) => theme.colors.publication_link};
    text-decoration: none;
  }
`;
