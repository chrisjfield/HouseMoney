import { IComponentProps, IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { ITransactionResponse } from '../AddTransaction/transactionsInterfaces';
import { IOccupantDetails } from '../Occupants/occupantsInterfaces';
import { IViewTransactionsStyles } from './viewTransactionsStyles';

export interface ITransactionHistory extends ITransactionResponse {
    creditorDisplayName: string;
    debtorDisplayName: string;
    enteredByDisplayName: string;
    enteredDate: Date;
}

export interface IViewTransactionsRequest extends IOccupantDetails {
    pageSize: number;
    pageNumber: number;
}

export interface IViewTransactionsState {
    pageNumber: number;
}

export interface IViewTransactionGridProps extends IViewTransactionsReducer, IViewTransactionsStyles { }

export interface IViewTransactionGridRowProps extends ITransactionHistory, IViewTransactionsStyles { }

export interface IViewTransactionsProps extends IViewTransactionsStore, IComponentProps, IViewTransactionsStyles { }

export interface IViewTransactionsStore extends IViewTransactionsReducer, IConnectedComponentProps {
    pageSize: number;
}

export interface IViewTransactionsReducer {
    transactionHistoryArray: ITransactionHistory[];
}
