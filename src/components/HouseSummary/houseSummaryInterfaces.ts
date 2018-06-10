import { Action } from 'redux';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { IHouseholdOccupants, ILoggedInOccupantDetails, IOccupant } from '../Occupants/occupantsInterfaces';

export interface IHouseSummaryProps extends IConnectedComponentProps, IHouseSummaryStore { }

export interface IHouseSummaryReducer {
    transactionSummaryArray: ITransactionSummary[];
}

export interface IHouseSummaryStore extends IHouseSummaryReducer, ILoggedInOccupantDetails, ILoadingProps, IHouseholdOccupants { }

export interface ITransactionSummary extends ITransactionResponse { }

export interface IReceiveTransactionHistoryAction extends Action, IHouseSummaryReducer { }

export interface IHouseSummaryRow {
    transactionSummaryArray: ITransactionSummary[];
    householdOccupant: IOccupant;
}
