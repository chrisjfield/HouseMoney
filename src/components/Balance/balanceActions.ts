import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { IBalance } from './balanceInterfaces';

export enum balanceActionTypes {
    GET_BALANCE_REQUEST = 'GET_BALANCE_REQUEST',
    GET_BALANCE_RESPONSE = 'GET_BALANCE_RESPONSE',
}

const getBalance = (occupantDetails: IOccupantDetails) => createAction(balanceActionTypes.GET_BALANCE_REQUEST, occupantDetails);
const receiveBalance = (balanceArray: IBalance[]) => createAction(balanceActionTypes.GET_BALANCE_RESPONSE, balanceArray);

export const BalanceActions = {
    getBalance,
    receiveBalance,
};
export type BalanceActions = ActionsUnion<typeof BalanceActions>;
