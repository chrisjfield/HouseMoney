import { combineReducers, Reducer } from 'redux';

import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';
import occupantsReducer from '../components/Occupants/occupantsReducer';
import { IStore } from '../interfaces/storeInterface';
import loadingReducer from '../components/Loading/loadingReducer';

const combinedReducers: Reducer<IStore> = combineReducers({
    occupantsReducer,
    errorMessageReducer,
    loadingReducer,
});

export default combinedReducers;
