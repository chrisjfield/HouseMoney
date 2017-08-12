import { RECEIVE_USER } from "./loginActions";

const loginReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, {
        USER: action.USER,
        isLoggedIn: action.isLoggedIn
      });
    default:
      return state;
  }
};

// Export Reducer
export default loginReducer;
