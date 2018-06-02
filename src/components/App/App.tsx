import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
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

export default App;
