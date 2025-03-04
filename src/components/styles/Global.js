import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
html, body, #___gatsby {
    height: 100%;
}

body {
    margin: 0px;
    font-family: sans-serif;
}

#gatsby-focus-wrapper{
    height: 100%;
}

div[role="group"][tabindex] {
    height: 100%;
}
    a {
        text-decoration: none;
        color:${({ theme }) => theme.colors.link};
        // h3 {
        //     color: #ff7f00;
        // }
        // p {
        //     color: #2269a6;
        // }
    }
`;

export const SpaceDivider = styled.div`
  width: 20px;
`;
