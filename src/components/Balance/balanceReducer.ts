import { balanceActionTypes } from './balanceActions';
import { IBalanceReducer, IReceiveBalanceAction } from './balanceInterfaces';

function balanceReducer(
    state: IBalanceReducer = {
        balanceArray: [],
    },
    action: IReceiveBalanceAction,
): IBalanceReducer {
    let nextState: IBalanceReducer;
    switch (action.type) {
    case balanceActionTypes.RECEIVE_BALANCE:
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
