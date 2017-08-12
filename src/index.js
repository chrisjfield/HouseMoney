import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import registerServiceWorker from "./mainComponents/registerServiceWorker";
import App from "./components/App";
import store from "./mainComponents/store";
import history from "./mainComponents/history";
import injectTapEventPlugin from "react-tap-event-plugin";
import { darkBaseTheme } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./css/index.css";
import WebFont from "webfontloader";

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: darkBaseTheme
  }
});

WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700", "sans-serif"]
  }
});
const mountApp = document.getElementById("root");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  mountApp
);

registerServiceWorker();
