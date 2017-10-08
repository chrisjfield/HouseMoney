import * as React from 'react';

import Nav from '../Nav';
import Routes from '../Routes';
import ErrorMessage from '../ErrorMessage';

function App() {
    return (
        <div>
            <Nav />
            <Routes />
            <ErrorMessage />
        </div>
    );
}

export default App;
