import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.label`
    cursor: pointer;
`;

const CustomRadioButton = styled.div`
    width: ${(props) => props.theme.space.large};
    height: ${(props) => props.theme.space.large};
    border: 2px solid ${(props) => props.theme.colors.slate};
    border-radius: 50% 50% 50% 50%;

    transition: all 0.5s ease-out;

    position: relative;

    &:after {
        content: attr(data-label);
        display: block;
        position: absolute;
        width: 100%;

        font-size: ${(props) => props.theme.fontSizes.medium};
        text-align: center;

        color: ${(props) => props.theme.colors.slate};
        transition: all 0.5s ease-out;
    }

    &[data-checked='true'] {
        border: 2px solid ${(props) => props.theme.colors.gold};
        border-radius: 50% 0 50% 50%;

        &:after {
            color: ${(props) => props.theme.colors.gold};
        }
    }
`;

export type RadioButtonProps = {
    name: string;
    value: number;
    isChecked: boolean;
    onChange: (newValue: number) => void;
};
const RadioButton: React.FC<RadioButtonProps> = (props: RadioButtonProps) => {
    const onChangeHandler = (newValue: number) => {
        props.onChange(newValue);
    };

    return (
        <Container>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                onChange={(event) => onChangeHandler(+event.target.value)}
                hidden
            />
            <CustomRadioButton data-label={props.value.toString()} data-checked={props.isChecked} />
        </Container>
    );
};

export default RadioButton;
