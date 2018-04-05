import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface IViewTransactionsProps extends IConnectedComponentProps { }

export interface IViewTransactionsState {
    transactionsReturned: boolean;
    transactionsData: IViewTransactionDetails[];
    pageNumber: number;
    pageSize: number;
    transactionCount: number;
}

export interface IViewTransactionDetails { // ED! bring this into generic ones file
    OTHERS: string;
    AMOUNT: number;
    date: Date;
    reference: string;
    PRIMARYKEY: string;
}

export interface IAddTransactionOccupant extends IOccupant {
    checked: boolean;
}
