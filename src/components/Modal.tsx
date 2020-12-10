import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../state/root';
import { hideModal } from '../state/slices/ui.slice';
import Button from './Button';
import Title from './Title';
import NavLink from './NavLink';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: grid;
    place-items: center;

    background-color: rgba(0, 0, 0, 0.75);
    z-index: 1000;

    opacity: 0;
    transition: all 0.5s ease-in-out;
    pointer-events: none;

    &[data-visible='true'] {
        opacity: 1;
        pointer-events: all;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 50vw;
    padding: ${(props) => props.theme.space.large} ${(props) => props.theme.space.larger};
    border: 2px solid ${(props) => props.theme.colors.slate};
    border-radius: ${(props) => props.theme.space.large};
    border-top-right-radius: 0;

    text-align: center;
    background: rgba(0, 0, 0, 0.5);

    opacity: 0;
    transform: scale(1.2, 1.2);
    transition: all 0.5s ease-in-out;

    &[data-visible='true'] {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const Message = styled.p`
    color: ${(props) => props.theme.colors.white};
    margin: ${(props) => props.theme.space.medium} 0;
`;

const ButtonsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const Modal: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.ui.modal);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(modal !== null);
    }, [modal]);

    const onCloseHandler = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(hideModal());
        }, 500);
    };

    return (
        <Wrapper data-visible={isVisible}>
            <Box data-visible={isVisible}>
                <Title text={modal?.title} />
                <Message>{modal?.message}</Message>
                <ButtonsRow>
                    {modal?.cancelButton ? <Button text={modal?.cancelButton} onClick={onCloseHandler} /> : null}
                    <NavLink to="/" text={modal?.confirmButton} callback={onCloseHandler} />
                </ButtonsRow>
            </Box>
        </Wrapper>
    );
};

export type ModalState = {
    title: string;
    message: string;
    confirmButton: string | null;
    cancelButton: string | null;
};
export default Modal;
