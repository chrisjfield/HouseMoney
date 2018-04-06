import { IReceiveTransactionAction, ITransactionReducer } from './transactionsInterfaces';
import { transactionActions } from './transactionsActions';

function transactionReducer(
    state: ITransactionReducer = {
        transactionsAdded: null,
    },
    action: IReceiveTransactionAction,
): ITransactionReducer {
    let nextState: ITransactionReducer;
    switch (action.type) {
    case transactionActions.ADD_TRANSACTION:
        nextState = {
            ...state,
            transactionsAdded: action.transactionsAdded,
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
