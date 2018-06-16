import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { createAction } from '../../helpers/actionCreator';
import { ajaxPromise } from '../../helpers/ajaxHelper';
import { AjaxCallParams } from '../../interfaces/apiInterfaces';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { ITransactionSummary } from './houseSummaryInterfaces';

export enum houseSummaryActionTypes {
    GET_TRANSACTION_SUMMARY = 'GET_TRANSACTION_SUMMARY',
}

export function getTransactionSummary(token: string, userId: string, occupantId: number) {
    const ajaxCallParams: AjaxCallParams = {
        token,
        endpoint: endpoints.transactionSummary,
        method: HTTPMethod.GET,
        urlParams: userId + ',' + occupantId,
    };
    const request = ajaxPromise<ITransactionSummary[]>(ajaxCallParams);
    return (dispatch: Function) => {
        dispatch(LoadingActions.loadingStarted());
        return request
            .then((response: ITransactionSummary[]) => {
                dispatch(receiveTransactionSummary(response));
                dispatch(LoadingActions.loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(ErrorMessageActions.addError(error.message));
                dispatch(LoadingActions.loadingComplete());
                throw error;
            });
    };
}

const receiveTransactionSummary = (transactionSummaryArray: ITransactionSummary[]) =>
    createAction(houseSummaryActionTypes.GET_TRANSACTION_SUMMARY, transactionSummaryArray);
