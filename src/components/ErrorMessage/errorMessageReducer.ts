import { errorMessageActionTypes } from './errorMessageActions';
import { IErrorMessageAction, IErrorMessageState } from './interfaces';

function errorMessageReducer(
    state: IErrorMessageState = { errorMessageText: null },
    action: IErrorMessageAction,
): IErrorMessageState {
    let nextState: IErrorMessageState;
    switch (action.type) {
    case errorMessageActionTypes.ADD_ERROR:
        nextState = { ...state,
            errorMessageText: action.errorMessageText,
        };
        break;
    case errorMessageActionTypes.REMOVE_ERROR:
        nextState = { ...state,
            errorMessageText: null,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Reducer
export default errorMessageReducer;
