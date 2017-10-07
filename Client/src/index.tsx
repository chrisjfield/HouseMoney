import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';
import store from './main/store';
import history from './main/history';
import appTheme from './main/themes';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './css/index.css';
import { load } from 'webfontloader';

load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif'],
    },
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const domElement: HTMLElement = document.getElementById('root');

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider muiTheme={appTheme}>
                <App/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
), domElement,
)
