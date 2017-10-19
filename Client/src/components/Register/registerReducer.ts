import { REGISTER_STARTED, REGISTER_COMPLETED } from './registerActions';
import { IRegisterState, IRegisterAction } from './interfaces';

function registerReducer(
    state: IRegisterState = {
        registerUser: null,
        error: null,
        loading: false,
    },
    action: IRegisterAction,
  ) {
    switch (action.type) {
    case REGISTER_STARTED:
        return {
            ...state,
            loading: true,
        };
    case REGISTER_COMPLETED:
        return {
            ...state,
            loading: false,
        };
    default:
        return state;
    }
}

export default registerReducer;
