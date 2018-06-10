import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { IHouseholdOccupants, IOccupant } from '../Occupants/occupantsInterfaces';

export interface ITransactionSummary extends ITransactionResponse { }

export interface IHouseSummaryRow {
    transactionSummaryArray: ITransactionSummary[];
    householdOccupant: IOccupant;
}

export interface IHouseSummaryProps extends IConnectedComponentProps, IHouseSummaryStore, ILoadingProps { }

export interface IHouseSummaryStore extends IHouseholdOccupants {
    transactionSummaryArray: ITransactionSummary[];
}
