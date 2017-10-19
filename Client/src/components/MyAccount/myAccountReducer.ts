import {
  EDIT_USER_STARTED,
  EDIT_USER_COMPLETED,
  DELETE_USER_STARTED,
  DELETE_USER_COMPLETED,
} from './myAccountActions';
import { IMyAccountReducerState, IMyAccountAction } from './interfaces';

function myAccountReducer(
  state: IMyAccountReducerState = {
      editing: false,
      deleting: false,
  },
  action: IMyAccountAction,
) {
    switch (action.type) {
    case EDIT_USER_STARTED:
        return {
            ...state,
            editing: true,
        };
    case EDIT_USER_COMPLETED:
        return {
            ...state,
            editing: false,
        };
    case DELETE_USER_STARTED:
        return {
            ...state,
            deleting: true,
        };
    case DELETE_USER_COMPLETED:
        return {
            ...state,
            deleting: false,
        };
    default:
        return state;
    }
}

export default myAccountReducer;
