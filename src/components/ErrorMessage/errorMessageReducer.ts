import { ADD_ERROR, REMOVE_ERROR } from './errorMessageActions';
import { IErrorMessageState, IErrorMessageAction } from './interfaces';

function errorMessageReducer(
    state: IErrorMessageState = { errorMessageText: null },
    action: IErrorMessageAction,
): IErrorMessageState {
    let nextState: IErrorMessageState;
    switch (action.type) {
    case ADD_ERROR:
        nextState = { ...state,
            errorMessageText: action.errorMessageText,
        };
        break;
    case REMOVE_ERROR:
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
