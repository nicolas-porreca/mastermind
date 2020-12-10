import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../state/root';
import { setOptions } from '../state/slices/options.slice';
import { moveVillain } from '../state/slices/ui.slice';
import { VILLAIN_POSITION } from '../components/Villain';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';
import NavLink from '../components/NavLink';
import Checkbox from '../components/Checkbox';
import RadioButton from '../components/RadioButton';

const Wrapper = styled.div`
    width: 50vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const Options = styled.form`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
`;

const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Label = styled.p`
    margin-bottom: ${(props) => props.theme.space.small};
`;

const RadioGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: ${(props) => props.theme.space.small};
`;

const ButtonRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const OptionsPage = () => {
    const dispatch = useDispatch();
    const [localNumberOfDigits, setLocalNumberOfDigits] = useState<number>();
    const [localNumberOfColors, setLocalNumberOfColors] = useState<number>();
    const [localUniqueColors, setLocalUniqueColors] = useState<boolean>();
    const [localLimitedAttempts, setLocalLimitedAttempts] = useState<boolean>();

    const globalNumberOfDigits = useSelector((state: RootState) => state.options.numberOfDigits);
    const globalNumberOfColors = useSelector((state: RootState) => state.options.numberOfColors);
    const globalUniqueColors = useSelector((state: RootState) => state.options.uniqueColors);
    const globalLimitedAttempts = useSelector((state: RootState) => state.options.limitedAttempts);

    useEffect(() => {
        dispatch(moveVillain(VILLAIN_POSITION.RIGHT));

        setLocalNumberOfDigits(globalNumberOfDigits);
        setLocalNumberOfColors(globalNumberOfColors);
        setLocalUniqueColors(globalUniqueColors);
        setLocalLimitedAttempts(globalLimitedAttempts);
    }, []);

    const onChangeNumberOfDigitsHandler = (newValue: number) => {
        setLocalNumberOfDigits(newValue);

        if (newValue > localNumberOfColors) {
            setLocalUniqueColors(false);
        }
    };

    const onChangeNumberOfColorsHandler = (newValue: number) => {
        setLocalNumberOfColors(newValue);

        if (newValue < localNumberOfDigits) {
            setLocalUniqueColors(false);
        }
    };

    const onChangeUniqueColorsHandler: (newValue: boolean) => void = (newValue: boolean) => {
        setLocalUniqueColors(newValue);

        if (localNumberOfDigits > localNumberOfColors) {
            setLocalNumberOfColors(localNumberOfDigits);
        }
    };

    const onChangeLimitedAttemptsHandler: (newValue: boolean) => void = (newValue: boolean) => {
        setLocalLimitedAttempts(newValue);
    };

    const onConfirmHandler: () => void = () => {
        dispatch(
            setOptions({
                numberOfColors: localNumberOfColors,
                numberOfDigits: localNumberOfDigits,
                uniqueColors: localUniqueColors,
                limitedAttempts: localLimitedAttempts,
            })
        );
    };

    let numberOfDigitsButtons = [];
    for (let i = 3; i <= 8; i++) {
        numberOfDigitsButtons.push(
            <RadioButton
                key={i}
                name="digits"
                value={i}
                isChecked={localNumberOfDigits === i}
                onChange={onChangeNumberOfDigitsHandler}
            />
        );
    }

    let numberofColorsButtons = [];
    for (let i = 3; i <= 8; i++) {
        numberofColorsButtons.push(
            <RadioButton
                key={i}
                name="colors"
                value={i}
                isChecked={localNumberOfColors === i}
                onChange={onChangeNumberOfColorsHandler}
            />
        );
    }

    return (
        <PageContainer>
            <Wrapper>
                <Title text="Options"></Title>
                <Options>
                    <Option>
                        <Label>Code length</Label>
                        <RadioGrid>{numberOfDigitsButtons}</RadioGrid>
                    </Option>

                    <Option>
                        <Label>Number of colors</Label>
                        <RadioGrid>{numberofColorsButtons}</RadioGrid>
                    </Option>

                    <Option>
                        <Label>10 attempts only</Label>
                        <Checkbox isChecked={localLimitedAttempts} onChange={onChangeLimitedAttemptsHandler} />
                    </Option>
                    <Option>
                        <Label>Unique colors</Label>
                        <Checkbox isChecked={localUniqueColors} onChange={onChangeUniqueColorsHandler} />
                    </Option>
                </Options>

                <ButtonRow>
                    <NavLink to="/" direction="left" text="Confirm" callback={onConfirmHandler} />
                    <NavLink to="/" direction="left" text="Back" />
                </ButtonRow>
            </Wrapper>
        </PageContainer>
    );
};

export default OptionsPage;
