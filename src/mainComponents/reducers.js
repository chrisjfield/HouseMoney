/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import navReducer from "../components/Nav/navReducer";
import paydayReducer from "../components/Payday/paydayReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  navReducer,
  paydayReducer
});

export default rootReducer;
