import apiHelper from '../../helpers/apiHelper';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';
import { addError } from '../ErrorMessage/errorMessageActions';
import { IBalance, IReceiveBalanceAction } from './balanceInterfaces';
import { loadingStarted, loadingComplete } from '../Loading/loadingActions';

export enum balanceActions {
    RECEIVE_BALANCE = 'RECEIVE_BALANCE',
}

export function getBalance(token: string, occupantId: number) {
    const request = apiHelper.apiCall(HTTPMethod.GET, endpoints.balance, token, occupantId.toString());
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then(() => {
                dispatch(receiveBalance(undefined));
                dispatch(loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(loadingComplete());
                throw error;
            });
    };
}

export function receiveBalance(balance: IBalance[]) {
    const response: IReceiveBalanceAction = {
        balance,
        type: balanceActions.RECEIVE_BALANCE,
    };
    return response;
}
