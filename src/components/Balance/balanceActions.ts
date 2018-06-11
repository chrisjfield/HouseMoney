import { createAction } from '../../helpers/actionCreator';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { IBalance } from './balanceInterfaces';

export enum balanceActionTypes {
    GET_BALANCE_REQUEST = 'GET_BALANCE_REQUEST',
    GET_BALANCE_RESPONSE = 'GET_BALANCE_RESPONSE',
}

export const getBalance = (occupantDetails: IOccupantDetails) => createAction(balanceActionTypes.GET_BALANCE_REQUEST, occupantDetails);
export const receiveBalance = (balanceArray: IBalance[]) => createAction(balanceActionTypes.GET_BALANCE_RESPONSE, balanceArray);
