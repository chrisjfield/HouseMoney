import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IFormStyles } from '../../styles/styles';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { IHouseholdOccupants, IOccupant } from '../Occupants/occupantsInterfaces';

export interface ITransactionSummary extends ITransactionResponse { }

export interface IHouseSummaryRow {
    transactionSummaryArray: ITransactionSummary[];
    householdOccupant: IOccupant;
}

export interface IHouseSummaryProps extends IHouseSummaryStore, IComponentProps, IFormStyles { }

export interface IHouseSummaryStore extends IHouseSummaryReducer, IHouseholdOccupants, IConnectedComponentProps { }

export interface IHouseSummaryReducer {
    transactionSummaryArray: ITransactionSummary[];
}
