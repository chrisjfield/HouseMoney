import { IReceiveBalanceAction, IBalanceReducer } from './balanceInterfaces';
import { balanceActions } from './balanceActions';

function balanceReducer(
    state: IBalanceReducer = {
        balance: [],
    },
    action: IReceiveBalanceAction,
) {
    switch (action.type) {
    case balanceActions.RECEIVE_BALANCE:
        return { // TODO: Figure out how to type this better ED! 
            ...state,
            balance: action.balance,
        };
    default:
        return state;
    }
}

// Export Reducer
export default balanceReducer;
