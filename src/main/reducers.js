/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import navReducer from "../components/Nav/navReducer";
import errorMessageReducer from "../components/ErrorMessage/errorMessageReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  navReducer,
  errorMessageReducer,
});

export default rootReducer;
