import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { ILoadingProps } from '../Loading/loadingInterfaces';
import { ILoggedInOccupantDetails, IOccupant } from '../Occupants/occupantsInterfaces';

export interface ITransactionHistory extends ITransactionResponse {
    creditorDisplayName: string;
    debtorDisplayName: string;
    enteredByDisplayName: string;
    enteredDate: Date;
}

export interface IAddTransactionOccupant extends IOccupant {
    checked: boolean;
}

export interface IViewTransactionsState {
    pageNumber: number;
}

export interface IViewTransactionsProps extends IConnectedComponentProps, IViewTransactionsStore {
    pageSize: number;
}

export interface IViewTransactionsStore {
    transactionHistoryArray: ITransactionHistory[];
}

export interface IViewTransactionGridProps extends IViewTransactionsProps { }

export interface IViewTransactionGridRowProps extends ITransactionHistory { }
