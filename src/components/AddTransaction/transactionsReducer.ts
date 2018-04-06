import { IReceiveTransactionAction, ITransactionReducer } from './transactionsInterfaces';
import { transactionActions } from './transactionsActions';

function transactionReducer(
    state: ITransactionReducer = {
        transactionArray: [],
    },
    action: IReceiveTransactionAction,
): ITransactionReducer {
    let nextState: ITransactionReducer;
    switch (action.type) {
    case transactionActions.ADD_TRANSACTION:
        nextState = {
            ...state,
            transactionArray: action.transactionArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Reducer
export default transactionReducer;
