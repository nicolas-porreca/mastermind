import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { RootState } from '../state/root';
import { GlobalStyle } from '../styles/GlobalStyle';
import backgroundPulse from '../styles/animations/background-pulse';
import Mastermind from './Villain';
import Modal from './Modal';
import SEO from './Seo';

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    animation: ${backgroundPulse} 4s linear infinite alternate;
`;

export type LayoutProps = {
    children: JSX.Element | string | (JSX.Element | string)[];
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

    return (
        <ThemeProvider theme={currentTheme}>
            <SEO title="MasterMind" lang="en" />
            <GlobalStyle theme={currentTheme} />
            <Background></Background>
            <Mastermind />
            {children}
            <Modal />
        </ThemeProvider>
    );
};

export default Layout;
