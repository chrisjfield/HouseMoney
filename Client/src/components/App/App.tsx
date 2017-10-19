import * as React from 'react';
import { IAppProps, IAppState } from './interfaces';

import Nav from '../Nav';
import Routes from '../Routes';
import ErrorMessage from '../ErrorMessage';

class App extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                <Routes history={this.props.history} />
                <ErrorMessage history={this.props.history} />
            </div>
        );
    }
}

export default App;
