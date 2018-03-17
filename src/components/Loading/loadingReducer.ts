import { loadingActions } from './loadingActions';
import { ILoadingProps } from './loadingInterfaces';
import { Action } from 'redux';

function loadingReducer(
    state: ILoadingProps = {
        loading: 0,
    },
    action: Action,
) {
    switch (action.type) {
    case loadingActions.LOADING_STARTED:
        return { // TODO: Figure out how to type this better ED! 
            ...state,
            loading: state.loading + 1,
        };
    case loadingActions.LOADING_COMPLETED:
        return {
            ...state,
            loading: state.loading > 0 ? state.loading - 1 : 0,
        };
    default:
        return state;
    }
}

// Export Reducer
export default loadingReducer;
