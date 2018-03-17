import { loadingActions } from './loadingActions';
import { ILoadingProps } from './loadingInterfaces';
import { Action } from 'redux';

function loadingReducer(
    state: ILoadingProps = {
        loading: 0,
    },
    action: Action,
): ILoadingProps {
    let nextState: ILoadingProps;
    switch (action.type) {
    case loadingActions.LOADING_STARTED:
        nextState = { ...state,
            loading: state.loading + 1,
        };
        break;
    case loadingActions.LOADING_COMPLETED:
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

// Export Reducer
export default loadingReducer;
