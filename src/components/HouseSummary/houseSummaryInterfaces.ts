import { Action } from 'redux';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { IHouseholdOccupants, ILoggedInOccupant, IOccupant } from '../Occupants/occupantsInterfaces';

export interface IHouseSummaryProps extends IConnectedComponentProps, IHouseSummaryStore { }

export interface IHouseSummaryReducer {
    transactionSummaryArray: ITransactionSummary[];
}

export interface IHouseSummaryStore extends IHouseSummaryReducer, ILoggedInOccupant, ILoadingProps, IHouseholdOccupants { }

export interface ITransactionSummary extends ITransactionResponse { }

export interface IReceiveTransactionHistoryAction extends Action, IHouseSummaryReducer { }

export interface IHouseSummaryRow {
    transactionSummaryArray: ITransactionSummary[];
    householdOccupant: IOccupant;
}
