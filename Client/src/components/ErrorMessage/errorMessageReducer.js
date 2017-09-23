import { ADD_ERROR, REMOVE_ERROR } from "./errorMessageActions";

const errorMessageReducer = (state = { errorMessageText: null }, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return Object.assign({}, state, {
        errorMessageText: action.payload
      });
    case REMOVE_ERROR:
      return Object.assign({}, state, { errorMessageText: null });
    default:
      return state;
  }
};

// Export Reducer
export default errorMessageReducer;
