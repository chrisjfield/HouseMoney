/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import userReducer from "../actions/user/userReducer";
import paydayReducer from "../components/Payday/paydayReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  userReducer,
  paydayReducer
});

export default rootReducer;
