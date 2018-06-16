import { ActionsUnion, createAction } from '../../helpers/actionCreator';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { ITransactionSummary } from './houseSummaryInterfaces';

export enum houseSummaryActionTypes {
    GET_TRANSACTION_SUMMARY_REQUEST = 'GET_TRANSACTION_SUMMARY_REQUEST',
    GET_TRANSACTION_SUMMARY_RESPONSE = 'GET_TRANSACTION_SUMMARY_RESPONSE',
}

const getTransactionSummary = (occupantDetails: IOccupantDetails) =>
    createAction(houseSummaryActionTypes.GET_TRANSACTION_SUMMARY_REQUEST, occupantDetails);

const receiveTransactionSummary = (transactionSummaryArray: ITransactionSummary[]) =>
    createAction(houseSummaryActionTypes.GET_TRANSACTION_SUMMARY_RESPONSE, transactionSummaryArray);

export const HouseSummaryActions = {
    getTransactionSummary,
    receiveTransactionSummary,
};

export type HouseSummaryActions = ActionsUnion<typeof HouseSummaryActions>;
