import styled from "styled-components";

export const PublicationListOfLists = styled.div`
    margin: 2rem;
    margin: 2rem;
`

export const StyledPublicationList = styled.table`
  width: 100%;
`

export const Publication = styled.tr`
    margin: 1rem;
    width: 100%;
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
export const ImageLink = styled.div`
    width: 32px;
    height: 32px;
    display: block;
    float:right;
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
`