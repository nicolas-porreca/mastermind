import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { moveVillain } from '../state/slices/ui.slice';
import { VILLAIN_POSITION } from '../components/Villain';
import PageContainer from '../components/PageContainer';
import NavLink from '../components/NavLink';
import Title from '../components/Title';

import SingleCheck from '../assets/images/check-single.svg';
import DoubleCheck from '../assets/images/check-double.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 ${(props) => props.theme.space.large};
`;

const Instructions = styled.p`
    text-align: center;
`;

const HowToPlayPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(moveVillain(VILLAIN_POSITION.OFF));
    }, []);

    return (
        <PageContainer>
            <Wrapper>
                <Title text="How To Play" />
                <Instructions>
                    Your objective is to guess a series of colors in the right order.
                    <br />
                    For each attempt, you will be given a feedback on your guess: <br />
                    <SingleCheck /> a <strong>single check</strong> means that you have guessed a color, but not its
                    position.
                    <br />
                    <DoubleCheck /> a <strong>double check</strong> means that you have guessed a color and also its
                    position.
                    <br />
                    <br />
                    Evil Mastermind model was made by Alvaro Zabala.
                    <br /> Check out his amazing work on{' '}
                    <a href="https://www.artstation.com/zawa" target="_blank">
                        ArtStation
                    </a>
                    !
                </Instructions>
                <NavLink to="/" direction="up" text="Back" />
            </Wrapper>
        </PageContainer>
    );
};

export default HowToPlayPage;
