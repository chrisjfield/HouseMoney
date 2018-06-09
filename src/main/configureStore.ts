import { routerMiddleware } from 'connected-react-router';
import * as localForage from 'localforage';
import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import history from './history';
import combinedReducers from './reducers';
import thunk from 'redux-thunk';

const rmiddleware: Middleware = routerMiddleware(history);

const persistConfig: PersistConfig = {
    key: 'root',
    storage: localForage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['errorMessageReducer', 'loadingReducer', 'transactionsReducer'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store: Store<{}> = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(thunk, logger, rmiddleware)),
);

export const persistor = persistStore(store);
