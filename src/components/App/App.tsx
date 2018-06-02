import * as React from 'react';
import ErrorMessage from '../ErrorMessage';
import Nav from '../Nav';
import Routes from '../Routes';


const App: React.StatelessComponent = () =>  {
    return (
        <div>
            <Nav />
            <Routes />
            <ErrorMessage />
        </div>
    );
};

export default App;
