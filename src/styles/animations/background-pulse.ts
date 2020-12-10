import { keyframes } from 'styled-components';

const backgroundPulse = (props: any) => keyframes`
    from {
        
        background-image: radial-gradient(
            circle at 50% 50%,
            transparent 33%,
            ${props.theme.colors.background.dark});
    }
    to {
        background-image: radial-gradient(
            circle at 50% 50%,
            transparent 33%,
            ${props.theme.colors.background.dark});
            background-color: ${props.theme.colors.background.light};
    }
`;

export default backgroundPulse;
