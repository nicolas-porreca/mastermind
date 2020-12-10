import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../state/root';
import { firstLoadDone, moveVillain, hideModal } from '../state/slices/ui.slice';
import { VILLAIN_POSITION } from '../components/Villain';
import PageContainer from '../components/PageContainer';
import Menu from '../components/Menu';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.75));

    opacity: 0;

    transition: all 0.5s ease-in-out 0.5s;
    pointer-events: none;

    &[data-active='true'] {
        opacity: 1;
        pointer-events: all;
    }
`;

const IndexPage: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const isFirstLoad = useSelector((state: RootState) => state.ui.isFirstLoad);
    const villainAtCenter = useSelector((state: RootState) => state.ui.villainPosition === VILLAIN_POSITION.CENTER);

    useEffect(() => {
        if (!isFirstLoad) {
            dispatch(moveVillain(VILLAIN_POSITION.CENTER));

            return;
        }

        dispatch(firstLoadDone());

        const timer = setTimeout(() => {
            dispatch(moveVillain(VILLAIN_POSITION.CENTER));
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <PageContainer>
            <Wrapper data-active={villainAtCenter}>
                <Menu></Menu>
            </Wrapper>
        </PageContainer>
    );
};

export default IndexPage;
