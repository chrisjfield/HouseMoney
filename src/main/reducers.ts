import { combineReducers, Reducer } from 'redux';

import navReducer from '../components/Nav/navReducer';
import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';

const combinedReducers: Reducer<Function> = combineReducers({
    navReducer,
    errorMessageReducer,
});

export default combinedReducers;
