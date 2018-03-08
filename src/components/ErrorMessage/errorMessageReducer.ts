import { ADD_ERROR, REMOVE_ERROR } from './errorMessageActions';
import { IErrorMessageState, IErrorMessageAction } from './interfaces';

function errorMessageReducer(
    state: IErrorMessageState = { errorMessageText: null },
    action: IErrorMessageAction,
) {
    switch (action.type) {
    case ADD_ERROR:
        return Object.assign({}, state, {
            errorMessageText: action.errorMessageText,
        });
    case REMOVE_ERROR:
        return Object.assign({}, state, { errorMessageText: null });
    default:
        return state;
    }
}

// Export Reducer
export default errorMessageReducer;
