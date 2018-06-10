import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { IHouseholdOccupants, IOccupant, ILoggedInOccupantDetails } from '../Occupants/occupantsInterfaces';

export interface ITransactionSummary extends ITransactionResponse { }

export interface IHouseSummaryRow {
    transactionSummaryArray: ITransactionSummary[];
    householdOccupant: IOccupant;
}

export interface IHouseSummaryProps extends IHouseSummaryStore, IHouseholdOccupants, ILoadingProps, ILoggedInOccupantDetails { }

export interface IHouseSummaryStore {
    transactionSummaryArray: ITransactionSummary[];
}
