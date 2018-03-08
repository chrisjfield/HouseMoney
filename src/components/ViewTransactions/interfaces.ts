import { IComponentProps } from '../../interfaces/componentInterfaces';
import { IOccupant } from '../Occupants/occupantsInterfaces';

export interface IViewTransactionsProps extends IComponentProps {
    loggedInOccupant: IOccupant;
}

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
    DATE: Date;
    REFERENCE: string;
    PRIMARYKEY: string;
}

export interface IAddTransactionUser extends IOccupant {
    checked: boolean;
}
