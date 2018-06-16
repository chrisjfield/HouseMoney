import { ViewTransactionsActions, viewTransactionsActionTypes } from './viewTransactionsActions';
import { IViewTransactionsReducer } from './viewTransactionsInterfaces';

function viewTransactionsReducer(
    state: IViewTransactionsReducer = {
        transactionHistoryArray: [],
    },
    action: ViewTransactionsActions,
): IViewTransactionsReducer {
    let nextState: IViewTransactionsReducer;
    switch (action.type) {
    case viewTransactionsActionTypes.GET_TRANSACTION_HISTORY_RESPONSE:
        nextState = {
            ...state,
            transactionHistoryArray: action.payload,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default viewTransactionsReducer;
