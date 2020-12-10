/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */


import { withStoreProvider } from './src/state/root';

export const wrapRootElement = withStoreProvider;
