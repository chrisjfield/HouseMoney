import apiHelper from '../../helpers/apiHelper';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { addError } from '../ErrorMessage/errorMessageActions';
import { loadingStarted, loadingComplete } from '../Loading/loadingActions';
import { IReceiveTransactionHistoryAction, ITransactionSummary } from './houseSummaryInterfaces';

export enum houseSummaryActions {
    GET_TRANSACTION_SUMMARY = 'GET_TRANSACTION_SUMMARY',
}

export function getTransactionSummary(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<ITransactionSummary[]>(
        HTTPMethod.GET, endpoints.transactionSummary, token, userId + ',' + occupantId,
    );
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then((response: ITransactionSummary[]) => {
                dispatch(receiveTransactionSummary(response));
                dispatch(loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(loadingComplete());
                throw error;
            });
    };
}

export function receiveTransactionSummary(transactionSummaryArray: ITransactionSummary[]): IReceiveTransactionHistoryAction {
    return {
        transactionSummaryArray,
        type: houseSummaryActions.GET_TRANSACTION_SUMMARY,
    };
}
