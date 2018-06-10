import { balanceActionTypes } from './balanceActions';
import { IBalanceStore } from './balanceInterfaces';
import { ActionWithPayload } from '../../helpers/actionCreator';

function balanceReducer(
    state: IBalanceStore = {
        balanceArray: [],
    },
    action: ActionWithPayload<balanceActionTypes, IBalanceStore>,
): IBalanceStore {
    let nextState: IBalanceStore;
    switch (action.type) {
    case balanceActionTypes.RECEIVE_BALANCE:
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
