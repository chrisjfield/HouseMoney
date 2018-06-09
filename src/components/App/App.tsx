import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../main/configureStore';
import history from '../../main/history';
import ErrorMessage from '../ErrorMessage';
import { Loading } from '../Loading';
import Nav from '../Nav';
import Routes from '../Routes';

const App: React.StatelessComponent = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <CssBaseline >
                        <div id="component-container">
                            <Nav dispatch={store.dispatch} />
                            <Routes />
                            <ErrorMessage dispatch={store.dispatch} />
                        </div>
                    </CssBaseline >
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
};

export default hot(module)(App);
