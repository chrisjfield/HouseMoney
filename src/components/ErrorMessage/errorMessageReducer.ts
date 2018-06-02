import { errorMessageActionTypes } from './errorMessageActions';
import { IErrorMessageAction, IErrorMessageStore } from './errorMessageInterfaces';

function errorMessageReducer(
    state: IErrorMessageStore = { errorMessageText: null },
    action: IErrorMessageAction,
): IErrorMessageStore {
    let nextState: IErrorMessageStore;
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
