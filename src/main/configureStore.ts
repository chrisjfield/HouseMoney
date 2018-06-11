import { routerMiddleware } from 'connected-react-router';
import * as localForage from 'localforage';
import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import combinedEpics from './epics';
import history from './history';
import combinedReducers from './reducers';

const rmiddleware: Middleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();

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
    compose(applyMiddleware(thunk, logger, rmiddleware, epicMiddleware)),
);

epicMiddleware.run(combinedEpics);

export const persistor = persistStore(store);
