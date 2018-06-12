import { Action } from 'redux';
import { loadingActionTypes } from './loadingActions';
import { ILoadingReducer } from './loadingInterfaces';

function loadingReducer(
    state: ILoadingReducer = {
        loading: 0,
    },
    action: Action,
): ILoadingReducer {
    let nextState: ILoadingReducer;
    switch (action.type) {
    case loadingActionTypes.LOADING_STARTED:
        nextState = { ...state,
            loading: state.loading + 1,
        };
        break;
    case loadingActionTypes.LOADING_COMPLETED:
        nextState = { ...state,
            loading: state.loading > 0 ? state.loading - 1 : 0,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default loadingReducer;
