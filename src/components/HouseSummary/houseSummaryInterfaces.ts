import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ILoggedInOccupant, IHouseholdOccupants, IOccupant } from '../Occupants/occupantsInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { Action } from 'redux';
import { ILoadingProps } from '../Loading/loadingInterfaces';

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
