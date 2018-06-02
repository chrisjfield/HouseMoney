import { viewTransactionsActions } from './viewTransactionsActions';
import { IReceiveTransactionHistoryAction, IViewTransactionReducer } from './viewTransactionsInterfaces';

function viewTransactionsReducer(
    state: IViewTransactionReducer = {
        transactionHistoryArray: [],
    },
    action: IReceiveTransactionHistoryAction,
): IViewTransactionReducer {
    let nextState: IViewTransactionReducer;
    switch (action.type) {
    case viewTransactionsActions.GET_TRANSACTION_HISTORY:
        nextState = {
            ...state,
            transactionHistoryArray: action.transactionHistoryArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Reducer
export default viewTransactionsReducer;
