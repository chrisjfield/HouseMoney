import { REGISTER_STARTED, REGISTER_COMPLETED } from './registerActions';

function registerReducer(
    state = {
        loading: false,
    },
    action: any,
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
