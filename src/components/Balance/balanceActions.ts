import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import apiHelper from '../../helpers/apiHelper';
import { addError } from '../ErrorMessage/errorMessageActions';
import { loadingComplete, loadingStarted } from '../Loading/loadingActions';
import { IBalance, IReceiveBalanceAction } from './balanceInterfaces';

export enum balanceActions {
    RECEIVE_BALANCE = 'RECEIVE_BALANCE',
}

export function getBalance(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<IBalance[]>(HTTPMethod.GET, endpoints.balance, token, userId + ',' + occupantId.toString());
    return (dispatch: Function) => {
        dispatch(loadingStarted());
        return request
            .then((response: IBalance[]) => {
                dispatch(receiveBalance(response));
                dispatch(loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(addError(error.message));
                dispatch(loadingComplete());
                throw error;
            });
    };
}

export function receiveBalance(balanceArray: IBalance[]): IReceiveBalanceAction {
    return {
        balanceArray,
        type: balanceActions.RECEIVE_BALANCE,
    };
}
