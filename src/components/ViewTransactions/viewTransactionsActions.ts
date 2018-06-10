import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import apiHelper from '../../helpers/apiHelper';
import { addError } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { ITransactionHistory } from './viewTransactionsInterfaces';
import { createAction } from '../../helpers/actionCreator';

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
                dispatch(addError(error.message));
                dispatch(LoadingActions.loadingComplete());
                throw error;
            });
    };
}

const receiveTransactionHistory = (transactionHistoryArray: ITransactionHistory[]) =>
    createAction(viewTransactionsActions.GET_TRANSACTION_HISTORY, transactionHistoryArray);
