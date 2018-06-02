import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import apiHelper from '../../helpers/apiHelper';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { ITransactionSummary } from './houseSummaryInterfaces';

export function getTransactionSummary(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<ITransactionSummary[]>(
        HTTPMethod.GET, endpoints.transactionSummary, token, userId + ',' + occupantId,
    );
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

export const HouseSummaryActions = { receiveTransactionSummary };

export enum houseSummaryActionTypes {
    GET_TRANSACTION_SUMMARY = 'GET_TRANSACTION_SUMMARY',
}

export type HouseSummaryActions = ActionsUnion<typeof HouseSummaryActions>;
