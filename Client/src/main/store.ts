import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate, PersistorConfig } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as localForage from 'localforage';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import history from './history';


const rmiddleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk, logger, rmiddleware), 
          autoRehydrate(),
  ),
);

const persistConfig: PersistorConfig = {
    blacklist: ['errorMessageReducer'],
    storage: localForage,
};

// For Dev persistStore(store).purge();
persistStore(store, persistConfig);

export default store;
