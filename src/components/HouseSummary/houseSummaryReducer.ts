import { IHouseSummaryReducer, IReceiveTransactionHistoryAction } from './houseSummaryInterfaces';
import { houseSummaryActions } from './houseSummaryActions';

function houseSummaryReducer(
    state: IHouseSummaryReducer = {
        transactionSummaryArray: [],
    },
    action: IReceiveTransactionHistoryAction,
): IHouseSummaryReducer {
    let nextState: IHouseSummaryReducer;
    switch (action.type) {
    case houseSummaryActions.GET_TRANSACTION_SUMMARY:
        nextState = {
            ...state,
            transactionSummaryArray: action.transactionSummaryArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

// Export Reducer
export default houseSummaryReducer;
