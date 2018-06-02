import * as localForage from 'localforage';
import { routerMiddleware } from 'react-router-redux';
import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
// import { IStore } from '../interfaces/storeInterface';
import history from './history';
import combinedReducers from './reducers';

const rmiddleware: Middleware = routerMiddleware(history);
// const storeReconciler: StateReconciler<IStore, IStore, IStore> = (previouisState, inboundState, reducedState, log) => {
//     const reducerInitalState: IStore = { ...reducedState };
//     const newStore = {
//         ...inboundState,
//         occupantsReducer: inboundState.occupantsReducer.isLoggedIn ?
//             inboundState.occupantsReducer : previouisState.occupantsReducer.isLoggedIn ?
//                 previouisState.occupantsReducer : reducedState.occupantsReducer,
//         errorMessageReducer: reducerInitalState.errorMessageReducer,
//         loadingReducer: reducerInitalState.loadingReducer,
//         transactionsReducer: reducerInitalState.transactionsReducer,
//     };

//     return newStore;
// };

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

export default () => {
    store;
    const persistor = persistStore(store);
    return { store, persistor };
};
