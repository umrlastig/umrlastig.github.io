import styled from "styled-components";

export const Position = styled.li`
    list-style: none;
    margin: 1rem;
    border-radius: 1rem;
    border:2px solid black;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    a {
        color: #29af7f;
        text-decoration: none;
        &:after {
            content: ". ";
        }
    }
    span:last-child {
        font-size: 1rem;
        background-color: ${({theme, $team}) => theme.colors[$team]};
        color: white;
        border-radius: 1rem;
        padding: 1rem;
        translate: 0 -40px;
    }
`