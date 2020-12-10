import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

import SingleCheck from '../assets/images/check-single.svg';
import DoubleCheck from '../assets/images/check-double.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../state/root';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: ${(props) => props.theme.space.larger};
    flex-grow: 0;
    flex-shrink: 0;

    align-items: center;
    justify-content: space-between;

    border: 2px solid ${(props) => props.theme.colors.slate};
    border-radius: ${(props) => props.theme.space.medium};

    opacity: 0;
    transform: translateX(100%);
    transition: all 0.5s ease-out;

    &[data-active='true'] {
        border: 2px solid ${(props) => props.theme.colors.gold};
        border-top-right-radius: 0;
    }

    &[data-visible='true'] {
        opacity: 1;
        transform: translateX(0);
    }
`;

const Attempt = styled.div`
    width: ${(props) => props.theme.space.large};
    height: ${(props) => props.theme.space.large};

    flex-grow: 0;
    flex-shrink: 0;

    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.gold};

    display: grid;
    place-items: center;
`;

const SlotRow = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;

    align-items: center;
    justify-content: space-evenly;
`;

const Slot = styled.button`
    cursor: pointer;
    width: ${(props) => props.theme.space.medium};
    height: ${(props) => props.theme.space.medium};
    border: 2px solid ${(props) => props.theme.colors.slate};
    border-radius: 50%;

    &:disabled {
        cursor: default;
    }

    // One point to Sass over Css-in-JS
    &[data-color='0'] {
        background: ${(props) => props.theme.colors.pegs[0]};
    }
    &[data-color='1'] {
        background: ${(props) => props.theme.colors.pegs[1]};
    }
    &[data-color='2'] {
        background: ${(props) => props.theme.colors.pegs[2]};
    }
    &[data-color='3'] {
        background: ${(props) => props.theme.colors.pegs[3]};
    }
    &[data-color='4'] {
        background: ${(props) => props.theme.colors.pegs[4]};
    }
    &[data-color='5'] {
        background: ${(props) => props.theme.colors.pegs[5]};
    }
    &[data-color='6'] {
        background: ${(props) => props.theme.colors.pegs[6]};
    }
    &[data-color='7'] {
        background: ${(props) => props.theme.colors.pegs[7]};
    }
`;

const Controls = styled.div`
    width: ${(props) => props.theme.space.larger};
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Results = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    place-items: center;
`;

const Icon = styled.div`
    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.gold};
`;

const Result = styled.div`
    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.white};
`;

export type GuessProps = {
    isActive?: boolean;
    attemptNumber: number;
    pickedColor: number;
    solution: string;
    onRightAnswer: () => void;
    onWrongAnswer: () => void;
};

const Guess: React.FC<GuessProps> = (props: GuessProps) => {
    const numberOfDigits = useSelector((state: RootState) => state.options.numberOfDigits);

    const defaultArray: number[] = [];
    for (let i = 0; i < numberOfDigits; i++) {
        defaultArray.push(-1);
    }
    const [code, setCode] = useState<number[]>(defaultArray);
    const [canTry, setCanTry] = useState<boolean>(false);
    const [correctColors, setCorrectColors] = useState<number>(0);
    const [correctSlots, setCorrectSlots] = useState<number>(0);
    const [hasTried, setHasTried] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        checkCanTry();
    }, code);

    const onSlotClickHandler = (index: number) => {
        setCode(
            code.map((digit: number, i: number) => {
                if (i === index) {
                    return props.pickedColor;
                } else {
                    return digit;
                }
            })
        );
    };

    const checkCanTry = () => {
        setCanTry(code.indexOf(-1) === -1);
    };

    const checkAnswerHandler = () => {
        const solution = props.solution.split('').map((value: string) => +value);
        const proposedSolution = [...code];

        // console.log('Checking ', proposedSolution, solution);
        if (proposedSolution.join('') === props.solution) {
            props.onRightAnswer();
        } else {
            let correctSlots = 0;
            proposedSolution.forEach((digit: number, index: number) => {
                if (digit !== -1 && digit === solution[index]) {
                    correctSlots++;
                    proposedSolution[index] = -1;
                    solution[index] = -1;
                    // console.log('A correct slot was found');
                }
            });

            let correctColors = 0;
            proposedSolution.forEach((digit: number, index: number) => {
                if (digit !== -1) {
                    const foundIndex = solution.indexOf(digit);

                    if (foundIndex !== -1) {
                        correctColors++;
                        proposedSolution[index] = -1;
                        solution[foundIndex] = -1;
                        // console.log('A corrent color was found');
                    }
                }
            });

            setCorrectSlots(correctSlots);
            setCorrectColors(correctColors);
            setHasTried(true);

            // console.log(proposedSolution, solution);
            props.onWrongAnswer();
        }
    };

    const slots: JSX.Element[] = [];
    for (let i = 0; i < numberOfDigits; i++) {
        slots.push(
            <Slot
                key={i}
                disabled={!props.isActive || hasTried}
                onClick={() => onSlotClickHandler(i)}
                data-color={code[i]}
            />
        );
    }

    return (
        <Wrapper data-active={props.isActive} data-visible={isVisible}>
            <Attempt>{props.attemptNumber}</Attempt>
            <SlotRow>{slots}</SlotRow>
            <Controls>
                {props.isActive && !hasTried ? (
                    <Button text="Try" isDisabled={!canTry} onClick={checkAnswerHandler} />
                ) : (
                    <Results>
                        <Icon>
                            <SingleCheck />
                        </Icon>
                        <Icon>
                            <DoubleCheck />
                        </Icon>
                        <Result>{correctColors}</Result>
                        <Result>{correctSlots}</Result>
                    </Results>
                )}
            </Controls>
        </Wrapper>
    );
};

export default Guess;
