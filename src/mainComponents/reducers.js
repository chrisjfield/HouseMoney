/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import userReducer from "../actions/user/userReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  userReducer
});

export default rootReducer;
