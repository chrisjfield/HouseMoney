import { transactionActionTypes } from './transactionsActions';
import { IAddTransactionStore } from './transactionsInterfaces';
import { ActionWithPayload } from '../../helpers/actionCreator';

function transactionReducer(
    state: IAddTransactionStore = {
        transactionsAdded: false,
    },
    action: ActionWithPayload<transactionActionTypes, IAddTransactionStore>,
): IAddTransactionStore {
    let nextState: IAddTransactionStore;
    switch (action.type) {
    case transactionActionTypes.ADD_TRANSACTION:
        nextState = {
            ...state,
            transactionsAdded: action.payload.transactionsAdded,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default transactionReducer;
