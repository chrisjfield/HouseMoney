// import actionCreatorFactory from 'typescript-fsa';
// import { endpoints } from '../../enums/endpointsEnum';
// import { HTTPMethod } from '../../enums/httpEnum';
// import apiHelper from '../../helpers/apiHelper';
// import { IOccupant } from '../Occupants/occupantsInterfaces';
// import { IBalance } from './balanceInterfaces';
import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IBalance } from './balanceInterfaces';

// const actionCreator = actionCreatorFactory();

export enum balanceActionTypes {
    GET_BALANCE = 'GET_BALANCE',
    RECEIVE_BALANCE = 'RECEIVE_BALANCE',
}

// export function getBalanceRequest(token: string, userId: string, occupantId: number) {
//     const request = apiHelper.apiCall<IBalance[]>(HTTPMethod.GET, endpoints.balance, token, userId + ',' + occupantId.toString());
//     return request;
// }

// export const getBalance = actionCreator<{ occupant: IOccupant }>(balanceActionTypes.GET_BALANCE);
// export const receiveBalance = actionCreator<{ balanceArray: IBalance[] }>(balanceActionTypes.RECEIVE_BALANCE);
const getBalance = (occupant: IOccupant) => createAction(balanceActionTypes.GET_BALANCE, occupant);
const receiveBalance = (balanceArray: IBalance[]) => createAction(balanceActionTypes.RECEIVE_BALANCE, balanceArray);

export const BalanceActions = {
    getBalance,
    receiveBalance,
};

export type BalanceActions = ActionsUnion<typeof BalanceActions>;
