import { HouseSummaryActions, houseSummaryActionTypes } from './houseSummaryActions';
import { IHouseSummaryReducer } from './houseSummaryInterfaces';

function houseSummaryReducer(
    state: IHouseSummaryReducer = {
        transactionSummaryArray: [],
    },
    action: HouseSummaryActions,
): IHouseSummaryReducer {
    let nextState: IHouseSummaryReducer;
    switch (action.type) {
    case houseSummaryActionTypes.GET_TRANSACTION_SUMMARY_RESPONSE:
        nextState = {
            ...state,
            transactionSummaryArray: action.payload,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default houseSummaryReducer;
