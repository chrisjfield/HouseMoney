import { houseSummaryActionTypes } from './houseSummaryActions';
import { IHouseSummaryStore } from './houseSummaryInterfaces';
import { ActionWithPayload } from '../../helpers/actionCreator';

function houseSummaryReducer(
    state: IHouseSummaryStore = {
        transactionSummaryArray: [],
    },
    action: ActionWithPayload<houseSummaryActionTypes, IHouseSummaryStore>,
): IHouseSummaryStore {
    let nextState: IHouseSummaryStore;
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

// Export Reducer
export default houseSummaryReducer;
