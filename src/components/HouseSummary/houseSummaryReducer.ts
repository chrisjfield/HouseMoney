import { ActionWithPayload } from '../../helpers/actionCreator';
import { houseSummaryActionTypes } from './houseSummaryActions';
import { IHouseSummaryReducer } from './houseSummaryInterfaces';

function houseSummaryReducer(
    state: IHouseSummaryReducer = {
        transactionSummaryArray: [],
    },
    action: ActionWithPayload<houseSummaryActionTypes, IHouseSummaryReducer>,
): IHouseSummaryReducer {
    let nextState: IHouseSummaryReducer;
    switch (action.type) {
    case houseSummaryActionTypes.GET_TRANSACTION_SUMMARY:
        nextState = {
            ...state,
            transactionSummaryArray: action.payload.transactionSummaryArray,
        };
        break;
    default:
        nextState = state;
        break;
    }
    return nextState;
}

export default houseSummaryReducer;
