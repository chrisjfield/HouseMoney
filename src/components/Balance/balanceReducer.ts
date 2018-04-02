import { IReceiveBalanceAction, IBalanceReducer } from './balanceInterfaces';
import { balanceActions } from './balanceActions';

function balanceReducer(
    state: IBalanceReducer = {
        balanceArray: [],
    },
    action: IReceiveBalanceAction,
): IBalanceReducer {
    let nextState: IBalanceReducer;
    switch (action.type) {
    case balanceActions.RECEIVE_BALANCE:
        nextState = { ...state,
            balanceArray: action.balanceArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Reducer
export default balanceReducer;
