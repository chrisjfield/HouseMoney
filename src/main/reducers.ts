import { combineReducers, Reducer } from 'redux';

import errorMessageReducer from '../components/ErrorMessage/errorMessageReducer';
import occupantsReducer from '../components/Occupants/occupantsReducer';

const combinedReducers: Reducer<Function> = combineReducers({
    occupantsReducer,
    errorMessageReducer,
});

export default combinedReducers;
