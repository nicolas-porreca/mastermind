import { createSlice } from '@reduxjs/toolkit';
import { VILLAIN_POSITION } from '../../components/Villain';
import { ModalState } from '../../components/Modal';

interface UiState {
    villainPosition: VILLAIN_POSITION;
    isFirstLoad: boolean;
    isMenuVisible: boolean;
    modal: ModalState;
}

const initialState: UiState = {
    villainPosition: VILLAIN_POSITION.OFF,
    isFirstLoad: true,
    isMenuVisible: false,
    modal: null,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        firstLoadDone: (state: UiState) => {
            state.isFirstLoad = false;
        },
        moveVillain: (state: UiState, action: { type: string; payload: VILLAIN_POSITION }) => {
            state.villainPosition = action.payload;
        },
        activateMenu: (state: UiState) => {
            state.isMenuVisible = true;
        },
        showModal: (state: UiState, action: { type: string; payload: ModalState }) => {
            state.modal = action.payload;
        },
        hideModal: (state: UiState) => {
            state.modal = null;
        },
    },
});

export const { firstLoadDone, moveVillain, activateMenu, showModal, hideModal } = uiSlice.actions;
