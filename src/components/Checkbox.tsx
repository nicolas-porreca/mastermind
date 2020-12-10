import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Checked from '../assets/images/check-single.svg';
import Unchecked from '../assets/images/unchecked.svg';

const Container = styled.label`
    cursor: pointer;
`;

const CustomCheckbox = styled.div`
    width: ${(props) => props.theme.space.large};
    height: ${(props) => props.theme.space.large};
    border: 2px solid ${(props) => props.theme.colors.slate};
    border-radius: 50% 50% 50% 50%;

    transition: all 0.5s ease-out;

    position: relative;

    & > * {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        padding: ${(props) => props.theme.space.smallest};

        text-align: center;

        color: ${(props) => props.theme.colors.slate};
        transition: all 0.5s ease-out;
    }

    &[data-checked='true'] {
        border: 2px solid ${(props) => props.theme.colors.gold};
        border-radius: 50% 0 50% 50%;

        & > * {
            color: ${(props) => props.theme.colors.gold};
        }
    }
`;

export type CheckboxProps = {
    isChecked: boolean;
    onChange: (newValue: boolean) => void;
};
const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        setIsChecked(props.isChecked || false);
    }, [props.isChecked]);

    const onChangeHandler = (newValue: boolean) => {
        setIsChecked(newValue);
        props.onChange(newValue);
    };

    return (
        <Container>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(event) => onChangeHandler(event.target.checked)}
                hidden
            />
            <CustomCheckbox data-checked={isChecked}>{isChecked ? <Checked /> : <Unchecked />}</CustomCheckbox>
        </Container>
    );
};

export default Checkbox;
