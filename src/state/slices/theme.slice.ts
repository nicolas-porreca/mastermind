import { createSlice } from '@reduxjs/toolkit';
import { defaultTheme } from '../../styles/themes/_default.theme';

interface ThemeState {
    currentTheme: any;
}

const initialState: ThemeState = {
    currentTheme: defaultTheme,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,

    reducers: {
        change: (state, action) => {
            state.currentTheme = action.payload;
        },
    },
});

export const { change } = themeSlice.actions;
