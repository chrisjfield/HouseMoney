import { BalanceActions, balanceActionTypes } from './balanceActions';
import { IBalanceReducer } from './balanceInterfaces';

function balanceReducer(
    state: IBalanceReducer = {
        balanceArray: [],
    },
    action: BalanceActions,
): IBalanceReducer {
    let nextState: IBalanceReducer;
    switch (action.type) {
    case balanceActionTypes.GET_BALANCE_RESPONSE:
        nextState = { ...state,
            balanceArray: action.payload,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default balanceReducer;
