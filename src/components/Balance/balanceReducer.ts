import { ActionWithPayload } from '../../helpers/actionCreator';
import { balanceActionTypes } from './balanceActions';
import { IBalanceStore } from './balanceInterfaces';

function balanceReducer(
    state: IBalanceStore = {
        balanceArray: [],
    },
    action: ActionWithPayload<balanceActionTypes, IBalanceStore>,
): IBalanceStore {
    let nextState: IBalanceStore;
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
