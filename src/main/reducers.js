/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import navReducer from "../components/Nav/navReducer";
import errorMessageReducer from "../components/ErrorMessage/errorMessageReducer";
import loginReducer from "../components/Login/loginReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  navReducer,
  errorMessageReducer,
  loginReducer,
});

export default rootReducer;
