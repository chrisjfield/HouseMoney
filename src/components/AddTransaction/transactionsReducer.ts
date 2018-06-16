import { TransactionActions, transactionActionTypes } from './transactionsActions';
import { IAddTransactionReducer } from './transactionsInterfaces';

function transactionReducer(
    state: IAddTransactionReducer = {
        transactionsAdded: false,
    },
    action: TransactionActions,
): IAddTransactionReducer {
    let nextState: IAddTransactionReducer;
    switch (action.type) {
    case transactionActionTypes.ADD_TRANSACTION_RESPONSE:
        nextState = {
            ...state,
            transactionsAdded: action.payload,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default transactionReducer;
