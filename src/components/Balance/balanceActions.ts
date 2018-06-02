import { endpoints } from '../../enums/endpointsEnum';
import { HTTPMethod } from '../../enums/httpEnum';
import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import apiHelper from '../../helpers/apiHelper';
import { ErrorMessageActions } from '../ErrorMessage/errorMessageActions';
import { LoadingActions } from '../Loading/loadingActions';
import { IBalance } from './balanceInterfaces';

export enum balanceActionTypes {
    RECEIVE_BALANCE = 'RECEIVE_BALANCE',
}

function getBalance(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<IBalance[]>(HTTPMethod.GET, endpoints.balance, token, userId + ',' + occupantId.toString());
    return (dispatch: Function) => {
        dispatch(LoadingActions.loadingStarted());
        return request
            .then((response: IBalance[]) => {
                dispatch(receiveBalance(response));
                dispatch(LoadingActions.loadingComplete());
            })
            .catch((error: Error) => {
                dispatch(ErrorMessageActions.addError(error.message));
                dispatch(LoadingActions.loadingComplete());
                throw error;
            });
    };
}

const receiveBalance = (balanceArray: IBalance[]) => createAction(balanceActionTypes.RECEIVE_BALANCE, balanceArray);

export const BalanceActions = {
    getBalance,
    receiveBalance,
};

export type BalanceActions = ActionsUnion<typeof BalanceActions>;
