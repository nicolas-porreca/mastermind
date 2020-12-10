/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */


import { store, withStoreProvider } from './src/state/root';

export const wrapRootElement = withStoreProvider;

export const onClientEntry = () => {
    setTimeout(() => {
        store.dispatch({ type: 'loader/release' });
    }, 5000);
};


