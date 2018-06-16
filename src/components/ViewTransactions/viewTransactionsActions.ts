import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { createAction } from '../../helpers/actionCreator';
import { ajaxPromise } from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { ITransactionHistory } from './viewTransactionsInterfaces';

export enum viewTransactionsActions {
    GET_TRANSACTION_HISTORY = 'GET_TRANSACTION_HISTORY',
}

// TODO: Make into observable
export function getTransactionHistory(token: string, userId: string, occupantId: number, pageSize: number, pageNumber: number) {
    const ajaxCallParams: AjaxCallParams = {
        token,
        endpoint: endpoints.transactionHistory,
        method: HTTPMethod.GET,
        urlParams: userId + ',' + occupantId + ',' + pageSize + ',' + pageNumber,
    };
    const request = ajaxPromise<ITransactionHistory[]>(ajaxCallParams);
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

const receiveTransactionHistory = (transactionHistoryArray: ITransactionHistory[]) =>
    createAction(viewTransactionsActions.GET_TRANSACTION_HISTORY, transactionHistoryArray);
