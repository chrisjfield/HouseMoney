import { ActionWithPayload } from '../../helpers/actionCreator';
import { errorMessageActionTypes } from './errorMessageActions';
import { IErrorMessageReducer } from './errorMessageInterfaces';

function errorMessageReducer(
    state: IErrorMessageReducer = { errorMessageText: null },
    action: ActionWithPayload<errorMessageActionTypes, IErrorMessageReducer>,
): IErrorMessageReducer {
    let nextState: IErrorMessageReducer;
    switch (action.type) {
    case errorMessageActionTypes.ADD_ERROR:
        nextState = {
            ...state,
            errorMessageText: action.payload.errorMessageText,
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
