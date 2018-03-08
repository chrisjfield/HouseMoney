import { combineReducers, Reducer } from 'redux';

import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';
import occupantsReducer from '../components/Occupants/occupantsReducer';
import { IStore } from '../interfaces/storeInterface';

const combinedReducers: Reducer<IStore> = combineReducers({
    occupantsReducer,
    errorMessageReducer,
});

export default combinedReducers;
