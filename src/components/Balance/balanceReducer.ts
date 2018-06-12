import { ActionWithPayload } from '../../helpers/actionCreator';
import { balanceActionTypes } from './balanceActions';
import { IBalanceReducer } from './balanceInterfaces';

function balanceReducer(
    state: IBalanceReducer = {
        balanceArray: [],
    },
    action: ActionWithPayload<balanceActionTypes, IBalanceReducer>,
): IBalanceReducer {
    let nextState: IBalanceReducer;
    switch (action.type) {
    case balanceActionTypes.GET_BALANCE_RESPONSE:
        nextState = { ...state,
            balanceArray: action.payload.balanceArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default balanceReducer;
