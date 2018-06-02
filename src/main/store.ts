import * as localForage from 'localforage';
import { routerMiddleware } from 'react-router-redux';
import { Middleware, Store, applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { PersistorConfig, autoRehydrate, persistStore } from 'redux-persist';
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

const store: Store<{}> = createStore(
    combinedReducers,
    undefined,
    compose(applyMiddleware(thunk, logger, rmiddleware), autoRehydrate(rehydrateConfig)),
);

const persistConfig: PersistorConfig = {
    blacklist: ['errorMessageReducer', 'loadingReducer'],
    storage: localForage,
    stateReconciler: autoMergeLevel2,
};

// For Dev persistStore(store).purge();
persistStore(store, persistConfig);

export default store;
