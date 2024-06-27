import styled from "styled-components";

export const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
`;

export const Button = styled.div`
    width: 100%;
    text-align: left;
    padding: 2px;
    background-color: ${({theme}) => theme.colors.header};
    color: ${({theme})=>theme.colors.headerText};
    // border: 1px solid;
    // border-color: muted;
    &: hover {
        background-color: ${({theme}) => theme.colors.highlight};
    }
    a {
        width: 100%;
        text-align: left;
        padding: ${({$subButton})=>$subButton?'2px':'0'};
        margin-left: ${({$subButton})=>$subButton?'5px':'0'};
        background-color: ${({theme}) => theme.colors.header};
        color: ${({theme})=>theme.colors.headerText};
        text-decoration: none;
        &: hover {
            background-color: ${({theme}) => theme.colors.highlight};
        }
    }
    img {
        width: auto;
        height: 60px;
    }
`;

export const Box = styled.div`
    display: ${({$isDropdownOpen}) => $isDropdownOpen ? 'block' : 'none'};
    margin-top: 2;
`;
