import { ADD_ERROR, REMOVE_ERROR } from "./errorMessageActions";

const errorMessageReducer = (
  state = { errors: { response: { ok: true, statusText: "" } } },
  action
) => {
  switch (action.type) {
    case ADD_ERROR:
      return Object.assign({}, state, {
        errors: action.error
      });
    case REMOVE_ERROR:
      return { errors: { response: { ok: true, statusText: "" } } };
    default:
      return state;
  }
};

// Export Reducer
export default errorMessageReducer;
