import styled from "styled-components";

export const Publication = styled.li`
    margin: 1rem;
    span {
        a {
            color: #bfbfbf;
            text-decoration: none;
            &:not(:last-child)::after {
                content: ", ";
            }
            &:last-child::after {
                content: ". ";
            }
        }
    }
    a {
        color: #29af7f;
        text-decoration: none;
        &:after {
            content: ". ";
        }
    }
`