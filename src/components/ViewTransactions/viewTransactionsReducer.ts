import { ActionWithPayload } from '../../helpers/actionCreator';
import { viewTransactionsActions } from './viewTransactionsActions';
import { IViewTransactionsReducer } from './viewTransactionsInterfaces';

function viewTransactionsReducer(
    state: IViewTransactionsReducer = {
        transactionHistoryArray: [],
    },
    action: ActionWithPayload<viewTransactionsActions, IViewTransactionsReducer>,
): IViewTransactionsReducer {
    let nextState: IViewTransactionsReducer;
    switch (action.type) {
    case viewTransactionsActions.GET_TRANSACTION_HISTORY:
        nextState = {
            ...state,
            transactionHistoryArray: action.payload.transactionHistoryArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default viewTransactionsReducer;
