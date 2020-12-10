import { fontSize } from 'styled-system';
import { Theme } from 'styled-system';
const baseline = '1rem';
const modularScaleFactor = 1.5;

export const defaultTheme: Theme = {
    colors: {
        gold: '#7F6F48',
        slate: '#2A343E',
        ruby: '#4d0d0d',
        black: '#100F0D',
        white: '#D6E9F7',

        background: {
            light: '#121520',
            dark: '#000',
        },

        pegs: ['#b63737', '#223aa5', '#fcd22d', '#258f25', '#883388', '#bb7024', '#33bbdd', '#533027'],
    },

    fontSizes: {
        smallest: '1.222rem',
        smaller: '1.978rem',
        small: '3.2rem',
        medium: '5.178rem',
        large: '8.377rem',
        larger: '13.555rem',
        largest: '21.931rem',
    },

    space: {
        none: 0,
        smallest: '.4rem',
        smaller: '.8rem',
        small: '1.6rem',
        medium: '3.2rem',
        large: '6.4rem',
        larger: '12.8rem',
        largest: '25.6rem',
    },
};
