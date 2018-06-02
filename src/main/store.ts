import * as localForage from 'localforage';
import { routerMiddleware } from 'react-router-redux';
import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { PersistorConfig, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import history from './history';
import combinedReducers from './reducers';

const rmiddleware: Middleware = routerMiddleware(history);

const store: Store<{}> = createStore(
  combinedReducers,
  undefined,
  compose(applyMiddleware(thunk, logger, rmiddleware)),
  // autoRehydrate()), Currently this screws the pass through auth 
);

const persistConfig: PersistorConfig = {
    blacklist: ['errorMessageReducer', 'loadingReducer'],
    storage: localForage,
};

// For Dev persistStore(store).purge();
persistStore(store, persistConfig);

export default store;
