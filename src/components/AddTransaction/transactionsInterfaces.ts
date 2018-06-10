import { IOccupant } from '../Occupants/occupantsInterfaces';
import { IConnectedComponentProps } from '../../interfaces/componentInterfaces';

export interface IAddTransationState {
    occupantsArray: IAddTransactionOccupant[];
    transactionDetails: ITransactionDetails;
    allChecked: boolean;
    transactionAdding: boolean;
    transactionAdded: boolean;
}

export interface IAddTransactionOccupant extends IOccupant {
    checked: boolean;
}

export interface ITransaction extends ITransactionDetails {
    creditorOccupantId: number;
    debtorOccupantId: number;
    enteredByOccupantId: number;
}

export interface ITransactionDetails {
    gross: number;
    reference: string;
    date: Date;
}

export interface ITransactionResponse extends ITransaction {
    transactionId: number;
}

export interface IAddTransactionProps extends IConnectedComponentProps, IAddTransactionStore {
    householdOccupantsArray: IAddTransactionOccupant[];
}

export interface IAddTransactionStore {
    transactionsAdded: boolean;
}
