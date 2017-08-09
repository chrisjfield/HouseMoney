import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import history from "./history";

import { routerMiddleware } from "react-router-redux";

const rmiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  { userReducer: { isLoggedIn: false } },
  compose(applyMiddleware(thunk, logger, rmiddleware), autoRehydrate())
);

//For Dev persistStore(store).purge();
persistStore(store, () => console.log("Rehydrated"));

export default store;
