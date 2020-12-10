import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../state/root';
import { moveVillain, showModal } from '../state/slices/ui.slice';
import { VILLAIN_POSITION } from '../components/Villain';
import PageContainer from '../components/PageContainer';
import NavLink from '../components/NavLink';
import Button from '../components/Button';
import Title from '../components/Title';
import Guess from '../components/Guess';

const Wrapper = styled.div`
    width: 50vw;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const FixedRow = styled.div`
    width: 100%;
    height: ${(props) => props.theme.space.larger};
    flex-grow: 0;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Palette = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const Color = styled.div<{ readonly colorCode: number }>`
    width: ${(props) => props.theme.space.large};
    height: ${(props) => props.theme.space.large};

    cursor: grabbing;
    background-color: ${(props) => props.theme.colors.pegs[props.colorCode]};
    background-image: linear-gradient(to top right, transparent, rgba(0, 0, 0, 0.6));

    border: 2px solid ${(props) => props.theme.colors.slate};
    border-radius: 50%;

    transition: all 0.5s ease-in-out;

    &[data-selected='true'] {
        border-top-right-radius: 0;
        border: 2px solid ${(props) => props.theme.colors.gold};
    }
`;

const Board = styled.ol`
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;

    overflow-y: auto;
    width: 100%;

    mask-image: linear-gradient(to bottom, white 50%, transparent);

    padding: 0 ${(props) => props.theme.space.large};

    & > * {
        margin-top: ${(props) => props.theme.space.medium};
    }

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const Separator = styled.hr`
    width: calc(100% - ${(props) => props.theme.space.larger});
    border-width: 2px;
    border-color: ${(props) => props.theme.colors.gold};
`;

const Spacer = styled.div`
    display: block;
    width: 100%;
    height: ${(props) => props.theme.space.largest};
    flex-grow: 0;
    flex-shrink: 0;
`;

const GamePage: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const options = useSelector((state: RootState) => state.options);
    const [superSecretAnswer, setSuperSecretAnswer] = useState<string>();
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState<number>(1);

    useEffect(() => {
        dispatch(moveVillain(VILLAIN_POSITION.LEFT));

        setSuperSecretAnswer(generateSuperSecretAnswer());
    }, []);

    const generateSuperSecretAnswer: () => string = () => {
        let availableChoices: string[] = [];
        for (let i = 0; i < options.numberOfColors; i++) {
            availableChoices.push(`${i}`);
        }

        let answer = '';
        for (let i = 0; i < options.numberOfDigits; i++) {
            const randomIndex = Math.floor(Math.random() * availableChoices.length);
            const digit = availableChoices[randomIndex];

            answer += digit;

            if (options.uniqueColors) {
                availableChoices.splice(randomIndex, 1);
            }
        }

        return answer;
    };

    const onSelectColorHandler = (colorIndex: number) => {
        setSelectedColor(colorIndex);
    };

    const onRightAnswerHandler = () => {
        dispatch(
            showModal({
                title: 'Victory!',
                message: 'Congratulations! You did it!',
                confirmButton: 'A Piece of Cake!',
                cancelButton: null,
            })
        );
    };

    const onWrongAnswerHandler = () => {
        if (options.limitedAttempts && numberOfAttempts >= 10) {
            dispatch(
                showModal({
                    title: 'Defeat!',
                    message: 'You have no more attempts.',
                    confirmButton: 'The Cake is a Lie!',
                    cancelButton: null,
                })
            );
        } else {
            setNumberOfAttempts(numberOfAttempts + 1);
        }
    };

    const colors: JSX.Element[] = [];
    for (let i = 0; i < options.numberOfColors; i++) {
        colors.push(
            <Color key={i} colorCode={i} data-selected={selectedColor === i} onClick={() => onSelectColorHandler(i)} />
        );
    }

    const guesses: JSX.Element[] = [];
    for (let i = 0; i < numberOfAttempts; i++) {
        guesses.unshift(
            <Guess
                key={i}
                isActive={i + 1 === numberOfAttempts}
                attemptNumber={i + 1}
                pickedColor={selectedColor}
                solution={superSecretAnswer}
                onRightAnswer={onRightAnswerHandler}
                onWrongAnswer={onWrongAnswerHandler}
            />
        );
    }

    const onGiveUpHandler = () => {
        dispatch(
            showModal({
                title: 'Are you sure?',
                message: 'Current game will be lost.',
                confirmButton: 'Confirm',
                cancelButton: 'Cancel',
            })
        );
    };

    return (
        <PageContainer>
            <Wrapper>
                <Title text="Good Luck!" />
                <FixedRow>
                    <Palette>{colors}</Palette>
                </FixedRow>
                <Separator />
                <Board>
                    {guesses}
                    <Spacer />
                </Board>
                <FixedRow>
                    <Button text="Give Up" onClick={onGiveUpHandler} />
                </FixedRow>
            </Wrapper>
        </PageContainer>
    );
};

export default GamePage;
