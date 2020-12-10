import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
    display: inline-block;

    font-size: ${(props) => props.theme.fontSizes.larger};
    letter-spacing: 0.2rem;

    color: transparent;
    background-image: linear-gradient(
        to top right,
        ${(props) => props.theme.colors.gold},
        ${(props) => props.theme.colors.slate}
    );
    background-clip: text;
    -webkit-background-clip: text;
`;

export type HeadingProps = {
    text: string;
};

const Title: React.FC<HeadingProps> = (props: HeadingProps) => {
    return <Heading>{props.text}</Heading>;
};

export default Title;
