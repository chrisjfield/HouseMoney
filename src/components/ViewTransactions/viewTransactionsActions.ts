import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { createAction } from '../../helpers/actionCreator';
import apiHelper from '../../helpers/apiHelper';
import { addError } from '../ErrorMessage/errorMessageActions';
import { loadingComplete, loadingStarted } from '../Loading/loadingActions';
import { ITransactionHistory } from './viewTransactionsInterfaces';

export enum viewTransactionsActions {
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

// TODO: Make into observable
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

const receiveTransactionHistory = (transactionHistoryArray: ITransactionHistory[]) =>
    createAction(viewTransactionsActions.GET_TRANSACTION_HISTORY, transactionHistoryArray);
