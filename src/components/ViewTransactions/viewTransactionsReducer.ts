import { viewTransactionsActions } from './viewTransactionsActions';
import { IViewTransactionsStore } from './viewTransactionsInterfaces';
import { ActionWithPayload } from '../../helpers/actionCreator';

function viewTransactionsReducer(
    state: IViewTransactionsStore = {
        transactionHistoryArray: [],
    },
    action: ActionWithPayload<viewTransactionsActions, IViewTransactionsStore>,
): IViewTransactionsStore {
    let nextState: IViewTransactionsStore;
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
