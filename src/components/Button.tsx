import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ readonly block: boolean }>`
    position: relative;
    text-decoration: none;

    font-size: ${(props) => props.theme.fontSizes.large};

    color: ${(props) => props.theme.colors.white};

    border-radius: ${(props) => props.theme.space.medium};
    border-top-right-radius: 0;
    padding: ${(props) => props.theme.space.small} ${(props) => props.theme.space.medium};
    overflow: hidden;

    width: ${(props) => (props.block ? '100%' : 'auto')};

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

    &:not(:disabled):hover {
        &:before {
            clip-path: circle(100%);
        }
    }

    &:disabled {
        cursor: not-allowed;
        color: ${(props) => props.theme.colors.slate};
        text-decoration: 2px line-through;
    }
`;

export type ButtonProps = {
    text: string;
    block?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <StyledButton disabled={props.isDisabled || false} onClick={props.onClick} block={props.block || false}>
            {props.text}
        </StyledButton>
    );
};

export default Button;
