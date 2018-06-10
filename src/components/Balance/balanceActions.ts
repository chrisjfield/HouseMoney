import { createAction } from '../../helpers/actionCreator';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IBalance } from './balanceInterfaces';
import apiHelper from '../../helpers/apiHelper';
import { HTTPMethod } from '../../enums/httpEnum';
import { endpoints } from '../../enums/endpointsEnum';

export enum balanceActionTypes {
    GET_BALANCE = 'GET_BALANCE',
    RECEIVE_BALANCE = 'RECEIVE_BALANCE',
}

export function getBalanceRequest(token: string, userId: string, occupantId: number) {
    const request = apiHelper.apiCall<IBalance[]>(HTTPMethod.GET, endpoints.balance, token, userId + ',' + occupantId.toString());
    return request;
}

export const getBalance = (occupant: IOccupant) => createAction(balanceActionTypes.GET_BALANCE, occupant);
export const receiveBalance = (balanceArray: IBalance[]) => createAction(balanceActionTypes.RECEIVE_BALANCE, balanceArray);
