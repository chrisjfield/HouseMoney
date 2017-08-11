import { RECEIVE_PAYDAY_USER_LIST } from "./paydayActions";

const paydayReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PAYDAY_USER_LIST:
      return Object.assign({}, state, {
        PAYDAY_USER_LIST: action.PAYDAY_USER_LIST
      });
    default:
      return state;
  }
};

// Export Reducer
export default paydayReducer;
