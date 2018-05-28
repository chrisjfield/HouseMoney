import apiHelper from '../../helpers/apiHelper';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { addError } from '../ErrorMessage/errorMessageActions';
import { loadingStarted, loadingComplete } from '../Loading/loadingActions';
import { IReceiveTransactionHistoryAction, ITransactionHistory } from './viewTransactionsInterfaces';

export enum viewTransactionsActions {
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

export function getTransactionHistory(token: string, userId: string, occupantId: number, pageSize: number, pageNumber: number) {
    const request = apiHelper.apiCall<ITransactionHistory[]>(
        HTTPMethod.GET, endpoints.transactionHistory, token, userId + ',' + occupantId + ',' + pageSize + ',' + pageNumber,
    );
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then((response: ITransactionHistory[]) => {
                dispatch(receiveTransactionHistory(response));
                dispatch(loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(loadingComplete());
                throw error;
            });
    };
}

export function receiveTransactionHistory(transactionHistoryArray: ITransactionHistory[]): IReceiveTransactionHistoryAction {
    return {
        transactionHistoryArray,
        type: viewTransactionsActions.GET_TRANSACTION_HISTORY,
    };
}
