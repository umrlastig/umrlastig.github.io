import styled from "styled-components";

export const NavButton = styled.button`
    display: none;
    padding: 24px;
    background-color: ${({theme}) => theme.colors.header};
    color: white;
    border: none;
    &: hover {
        background-color: ${({theme}) => theme.colors.highlight};
    }
    @media (max-width: 600px) {
        display: block;
    }
`;

export const StyledNav = styled.nav`
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    padding: 24px;
    background-color: ${({theme}) => theme.colors.header};
    color: white;
    display: flex;
    @media (max-width: 600px) {
        flex-direction: column;
        display: ${({$isOpen}) => $isOpen ? 'flex' : 'none'};
    }
`;