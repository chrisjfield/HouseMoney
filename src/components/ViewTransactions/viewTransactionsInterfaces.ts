import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';

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

export interface IViewTransactionGridProps extends IViewTransactionsReducer { }

export interface IViewTransactionGridRowProps extends ITransactionHistory { }

export interface IViewTransactionsProps extends IViewTransactionsStore, IComponentProps { }

export interface IViewTransactionsStore extends IViewTransactionsReducer, IConnectedComponentProps {
    pageSize: number;
}

export interface IViewTransactionsReducer {
    transactionHistoryArray: ITransactionHistory[];
}
