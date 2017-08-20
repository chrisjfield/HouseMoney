/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers

import navReducer from "../components/Nav/navReducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  navReducer
});

export default rootReducer;
