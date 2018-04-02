import { createStore, applyMiddleware, compose, Middleware, Store } from 'redux';
import { persistStore, PersistorConfig } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as localForage from 'localforage';
import { routerMiddleware } from 'react-router-redux';

import combinedReducers from './reducers';
import history from './history';


const rmiddleware: Middleware = routerMiddleware(history);

const store: Store<{}> = createStore(
  combinedReducers,
  undefined,
  compose(applyMiddleware(thunk, logger, rmiddleware), 
          // autoRehydrate(),
  ),
);

const persistConfig: PersistorConfig = {
    blacklist: ['errorMessageReducer', 'loadingReducer'],
    storage: localForage,
};

// For Dev persistStore(store).purge();
persistStore(store, persistConfig);

export default store;
