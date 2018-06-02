import { transactionActionTypes } from './transactionsActions';
import { IReceiveTransactionAction, ITransactionReducer } from './transactionsInterfaces';

function transactionReducer(
    state: ITransactionReducer = {
        transactionsAdded: null,
    },
    action: IReceiveTransactionAction,
): ITransactionReducer {
    let nextState: ITransactionReducer;
    switch (action.type) {
    case transactionActionTypes.ADD_TRANSACTION:
        nextState = {
            ...state,
            transactionsAdded: action.transactionsAdded, // TODO: ED! Fix disconnect here! need to re read articles
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
