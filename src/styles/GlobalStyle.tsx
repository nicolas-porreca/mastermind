import { createGlobalStyle } from 'styled-components';

import './@font-faces.css';

export const GlobalStyle = createGlobalStyle<{ theme: any }>`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        /* cursor: none; */
    }

    html {
        font-size: 62.5%;

    }

    body {
        font-family: 'Tulpen One';
        
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        background: ${(props) => props.theme.colors.background.dark};
        
        user-select: none;
        overflow: hidden;

        &::-webkit-scrollbar {
            width: 0;
        }

    }

    p {
        font-size: ${(props) => props.theme.fontSizes.large};
        

        color: ${(props) => props.theme.colors.white};
    }

    button {
        font-family: 'Tulpen One';
        border: none;
        background: none;
        cursor: pointer;
        outline: none;
    }

    a {
        color: ${(props) => props.theme.colors.gold};
        text-decoration: none;
    }


`;
