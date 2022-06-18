
import React from 'react';
import styled from 'styled-components';
import Progress from './Pages/Progress';

const AppWrapper = styled.div`
    min-width: 100vw;
    min-height: 100vh;
`;

const App = () => {

    return (
        <AppWrapper>
            <Progress />
        </AppWrapper>
    );
}

export default App;