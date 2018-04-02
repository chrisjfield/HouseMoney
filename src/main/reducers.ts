import { combineReducers, Reducer } from 'redux';

import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';
import occupantsReducer from '../components/Occupants/occupantsReducer';
import { IStore } from '../interfaces/storeInterface';
import loadingReducer from '../components/Loading/loadingReducer';
import balanceReducer from '../components/Balance/balanceReducer';

const combinedReducers: Reducer<IStore> = combineReducers({
    occupantsReducer,
    errorMessageReducer,
    loadingReducer,
    balanceReducer,
});

export default combinedReducers;
