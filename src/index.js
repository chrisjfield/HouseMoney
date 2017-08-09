import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import registerServiceWorker from "./mainComponents/registerServiceWorker";
import App from "./components/App";
import store from "./mainComponents/store";
import history from "./mainComponents/history";
import "./css/bootstrap.css";
import "./css/index.css"; //import this second to override bootstrap

const mountApp = document.getElementById("root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  mountApp
);

registerServiceWorker();
