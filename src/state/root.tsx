import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { themeSlice } from './slices/theme.slice';

import { optionsSlice } from './slices/options.slice';
import { uiSlice } from './slices/ui.slice';

const rootReducer = combineReducers({
    options: optionsSlice.reducer,
    ui: uiSlice.reducer,
    theme: themeSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const withStoreProvider = ({ element }) => {
    return <Provider store={store}>{element}</Provider>;
};
