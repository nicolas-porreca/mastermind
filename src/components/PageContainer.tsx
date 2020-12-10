import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    position: relative;
`;

const PageContainer: React.FC<{}> = (props) => {
    return <Container>{props.children}</Container>;
};

export default PageContainer;
