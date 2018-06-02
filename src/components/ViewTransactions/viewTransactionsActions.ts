import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import apiHelper from '../../helpers/apiHelper';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { IReceiveTransactionHistoryAction, ITransactionHistory } from './viewTransactionsInterfaces';

export enum viewTransactionsActions {
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

export function getTransactionHistory(token: string, userId: string, occupantId: number, pageSize: number, pageNumber: number) {
    const request = apiHelper.apiCall<ITransactionHistory[]>(
        HTTPMethod.GET, endpoints.transactionHistory, token, userId + ',' + occupantId + ',' + pageSize + ',' + pageNumber,
    );
    return (dispatch: Function) => {
        dispatch(LoadingActions.loadingStarted());
        return request
            .then((response: ITransactionHistory[]) => {
                dispatch(receiveTransactionHistory(response));
                dispatch(LoadingActions.loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(ErrorMessageActions.addError(error.message));
                dispatch(LoadingActions.loadingComplete());
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
