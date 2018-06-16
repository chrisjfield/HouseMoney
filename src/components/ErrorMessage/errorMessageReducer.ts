import { ErrorMessageActions, errorMessageActionTypes } from './errorMessageActions';
import { IErrorMessageReducer } from './errorMessageInterfaces';

function errorMessageReducer(
    state: IErrorMessageReducer = { errorMessageText: null },
    action: ErrorMessageActions,
): IErrorMessageReducer {
    let nextState: IErrorMessageReducer;
    switch (action.type) {
    case errorMessageActionTypes.ADD_ERROR:
        nextState = {
            ...state,
            errorMessageText: action.payload,
        };
        break;
    case errorMessageActionTypes.REMOVE_ERROR:
        nextState = {
            ...state,
            errorMessageText: null,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default errorMessageReducer;
