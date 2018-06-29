import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../main/configureStore';
import history from '../../main/history';
import appTheme from '../../themes';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import Nav from '../Nav';
import Routes from '../Routes';

const App: React.StatelessComponent = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <MuiThemeProvider theme={appTheme}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <CssBaseline />
                            <Nav />
                            <Routes />
                            <ErrorMessage />
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
