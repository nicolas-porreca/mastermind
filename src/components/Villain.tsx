import React from 'react';
import { useSelector } from 'react-redux';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { RootState } from '../state/root';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div<{ readonly currentPosition: VILLAIN_POSITION }>`
    width: 850px;

    opacity: ${({ currentPosition }) => (currentPosition === VILLAIN_POSITION.OFF ? 0 : 1)};
    transform: translateX(
        ${({ currentPosition }) => {
            switch (currentPosition) {
                case VILLAIN_POSITION.LEFT:
                    return '-25vw';
                case VILLAIN_POSITION.RIGHT:
                    return '25vw';
                default:
                    return '0';
            }
        }}
    );

    transition: all 0.5s ease-out;
`;

export enum VILLAIN_POSITION {
    OFF = 'off',
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left',
}

const Villain: React.FC<{}> = () => {
    const currentPosition = useSelector((state: RootState) => state.ui.villainPosition);

    const data = useStaticQuery(graphql`
        query {
            mastermindFront: file(relativePath: { eq: "mastermind.png" }) {
                childImageSharp {
                    fluid(maxWidth: 850) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    if (!data?.mastermindFront?.childImageSharp?.fluid) {
        return <div>Picture not found</div>;
    }

    return (
        <Container>
            <Wrapper currentPosition={currentPosition || VILLAIN_POSITION.OFF}>
                <Img fluid={data.mastermindFront.childImageSharp.fluid} />
            </Wrapper>
        </Container>
    );
};

export default Villain;
