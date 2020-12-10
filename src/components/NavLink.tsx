import React from 'react';
import styled from 'styled-components';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const StyledAniLink = styled(AniLink)`
    position: relative;
    text-decoration: none;

    font-size: ${(props) => props.theme.fontSizes.large};

    color: ${(props) => props.theme.colors.white};

    border-radius: ${(props) => props.theme.space.medium};
    border-top-right-radius: 0;
    margin: ${(props) => props.theme.space.small} ${(props) => props.theme.space.medium};
    padding: ${(props) => props.theme.space.small} ${(props) => props.theme.space.medium};
    overflow: hidden;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-clip: border-box;
        background: ${(props) => props.theme.colors.white};
        clip-path: circle(0%);

        mix-blend-mode: difference;
        transition: all 0.5s ease-in-out;
    }

    &:hover {
        &:before {
            clip-path: circle(100%);
        }
    }
`;

export type NavLinkProps = {
    direction?: 'up' | 'down' | 'left' | 'right';
    text?: string;
    to: string;
    callback?: () => void;
};

const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    return (
        <StyledAniLink swipe direction={props.direction || 'left'} to={props.to} onClick={props.callback}>
            {props.text || props.to}
        </StyledAniLink>
    );
};

export default NavLink;
