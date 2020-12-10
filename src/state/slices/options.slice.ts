import { createSlice } from '@reduxjs/toolkit';

interface OptionsState {
    numberOfColors: number;
    numberOfDigits: number;
    limitedAttempts: boolean;
    uniqueColors: boolean;
}

const initialState: OptionsState = {
    numberOfColors: 4,
    numberOfDigits: 4,
    limitedAttempts: true,
    uniqueColors: true,
};

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setOptions: (state: OptionsState, action: { type: string; payload: OptionsState }) => {
            state.numberOfColors = action.payload.numberOfColors;
            state.numberOfDigits = action.payload.numberOfDigits;
            state.limitedAttempts = action.payload.limitedAttempts;
            state.uniqueColors = action.payload.uniqueColors;
        },
    },
});

export const { setOptions } = optionsSlice.actions;
