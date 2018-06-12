import { ActionWithPayload } from '../../helpers/actionCreator';
import { transactionActionTypes } from './transactionsActions';
import { IAddTransactionReducer } from './transactionsInterfaces';

function transactionReducer(
    state: IAddTransactionReducer = {
        transactionsAdded: false,
    },
    action: ActionWithPayload<transactionActionTypes, IAddTransactionReducer>,
): IAddTransactionReducer {
    let nextState: IAddTransactionReducer;
    switch (action.type) {
    case transactionActionTypes.ADD_TRANSACTION_RESPONSE:
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
