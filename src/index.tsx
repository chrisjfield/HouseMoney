import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { load } from 'webfontloader';
import App from './components/App';
import { Loading } from './components/Loading';
import history from './main/history';
import store from './main/store';
import './styles/css/app.css';

load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif'],
    },
});

const domElement: HTMLElement = document.getElementById('root');

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <ConnectedRouter history={history}>
                <CssBaseline >
                    <App />
                </CssBaseline >
            </ConnectedRouter>
        </PersistGate>
    </Provider>
),              domElement,
);
