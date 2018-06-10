import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { IHouseholdOccupants, IOccupant } from '../Occupants/occupantsInterfaces';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface ITransactionSummary extends ITransactionResponse { }

export interface IHouseSummaryRow {
    transactionSummaryArray: ITransactionSummary[];
    householdOccupant: IOccupant;
}

export interface IHouseSummaryProps extends IHouseSummaryStore, IHouseholdOccupants, IConnectedComponentProps { }

export interface IHouseSummaryStore {
    transactionSummaryArray: ITransactionSummary[];
}
