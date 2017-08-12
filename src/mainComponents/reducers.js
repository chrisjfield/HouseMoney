/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import loginReducer from "../components/Login/loginReducer";
import paydayReducer from "../components/Payday/paydayReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  loginReducer,
  paydayReducer
});

export default rootReducer;
