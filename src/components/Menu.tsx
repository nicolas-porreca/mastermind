import React from 'react';
import styled from 'styled-components';

import NavLink from './NavLink';

const Wrapper = styled.div`
    width: 100%;

    padding: ${(props) => props.theme.space.medium};

    display: flex;
    flex-direction: row;

    justify-content: center;
`;

const Menu: React.FC<{}> = () => {
    return (
        <Wrapper>
            <NavLink to="/options" direction="right" text="Options" />
            <NavLink to="/how-to-play" direction="down" text="How To Play" />
            <NavLink to="/game" direction="left" text="Start Game" />
        </Wrapper>
    );
};

export default Menu;
